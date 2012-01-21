var _ = function(selector) { return new Selector(selector); };
var loadScene = function(name) { sceneName = name; };
var beforeEach = function(func) { beforesToRun.Push(func); };
var context = function(name, func) { describe(name, func); };
var describe = function(name, func) {
  var before = beforesToRun.length;
  func();
  var after = beforesToRun.length;
  for(var index = 0; index < (after-before); index++) { 
    beforesToRun.Pop(); 
  }
};
var expect = function(actual) { return new Matcher(actual); };
var match = function(actual) { return new Matcher(actual, {'showErrors': false}); };

function it(name) { 
  testCount++;
  pendingCount++; 
}
function xit(name, func) { it(name); }
function it(name, func) {
  testsToRun.Push({'befores': new Array(beforesToRun), 'test': func}); 
}

// Will be overridden by spec
function run() {}

static var testsToRun = new Array();
static var beforesToRun = new Array();
static var testCount = 0;
static var failCount = 0;
static var pendingCount = 0;
static var failedExpectation = false;
static var testsFinished = false;
static var sceneName;

function Start() {
  if(!testsFinished) {
    if(testsToRun.length == 0) {
      beginTests();
    } else {
      runNextTest();
      updateTestResults();
      Application.LoadLevel(sceneName);
    }
  } else {
    var passOrFail = failCount > 0 ? 'FAIL: ' : 'PASS: ';
    Debug.Log(passOrFail + testCount + ' tests, ' + failCount + ' failures, ' + pendingCount + ' pending, ' + Time.time + ' secs.');
  }
}

class Selector {
 function Selector(selector) {
   _gameObject = GameObject.Find(selector);
 }
 
 function moveTo(x, y, z) {
   _gameObject.transform.position = new Vector3(x, y, z);
 }
 
 function getGameObject() {
   return _gameObject;
 }
 
 var _gameObject;
}

class Matcher {
  function Matcher(actual, options) {
    initialize(actual, options);
  }
  
  function Matcher(actual) {
    initialize(actual, {});
  }
  
  function initialize(actual, options) {
    _negate = false;
    _failed = false;
    _showErrors = true;
    
    if(options['showErrors'] != null) {
      _showErrors = options['showErrors'];
    }
    
    if (actual == null) {
      _actual = new Null();
    } else {
      switch(actual.GetType()) {
        case typeof(Selector):
          _actual = actual.getGameObject();
          break;
        case typeof(Matcher):
          _failed = actual._failed;
          break;
        default:
          _actual = actual;
          break;
      }
    }
  }
  
  function failed(message) {
    if(_showErrors) {
      gunpowder.failedExpectation = true;
      Debug.LogError(message);
    }
    _failed = true;
  }
  
  function toExist() {
    var actual_exists = _actual != null && typeof(_actual) != Null;

    if(_negate) {
      if(actual_exists) {
        failed("Expected "+ _actual +" not to exist");
      }
    } else {
      if(!actual_exists) {
        failed("Expected "+ _actual +" to exist");
      }
    }

    return this;
  }

  function toBeTruthy() {
    if(_negate) {
      if(_actual == true) {
        failed('Expected ' + _actual + ' not to be truthy');
      }
    } else {
      if(_actual != true) {
        failed('Expected ' + _actual + ' to be truthy');
      }
    }
    
    return this;
  }
  
  function toBeFalsy() {
    if(_negate) {
      if(_actual == false) {
        failed('Expected ' + _actual + ' not to be falsy');
      }
    } else {
      if(_actual != false) {
        failed('Expected ' + _actual + ' to be falsy');
      }
    }
    
    return this;
  }
  
  function toEqual(expected) {
    if(_negate) {
      if(_actual == expected) {
        failed('Expected ' + _actual + ' not to equal ' + expected);
      }
    } else {
      if(_actual != expected) {
        failed('Expected ' + _actual + ' to equal ' + expected);
      }
    }
    
    return this;
  }
  
  function toHavePosition(expectedX, expectedY, expectedZ) {
    var actualPosition = _actual.transform.position;
    var expectedPosition = new Vector3(expectedX, expectedY, expectedZ);
    
    if(_negate) {
      if(Vector3.Distance(actualPosition, expectedPosition) == 0) {
        failed('Expected ' + _actual.name + ' not to have position ' + expectedPosition + ' but got ' + actualPosition);
      }
    } else {
      if(Vector3.Distance(actualPosition, expectedPosition) != 0) {
        failed('Expected ' + _actual.name + ' to have position ' + expectedPosition + ' but got ' + actualPosition);
      } 
    }
    
    return this;
  }

 function toBeVisible() {
   if(_negate) {
     if(_actual.renderer.enabled) {
       failed('Expected ' + _actual.name + ' not to be visible');
     }
   } else {
     if(!_actual.renderer.enabled) {
       failed('Expected ' + _actual.name + ' to be visible');
     }
   }
   
   return this;
 }
 
 function toBeHidden() {
   if(_negate) {
     if(!_actual.renderer.enabled) {
       failed('Expected ' + _actual.name + ' not to be hidden');
     }
   } else {
     if(_actual.renderer.enabled) {
       failed('Expected ' + _actual.name + ' to be hidden');
     }
   }
   
   return this;
 }
  
  function not() {
    _negate = true;
    return this;
  }
  
  function toPass() {
    if(_failed) {
      failed('Expected to pass but failed');
    }
  }
  
  function toFail() {
    if(!_failed) {
      failed('Expected to fail but passed');
    }
  }
  
  var _actual;
  var _negate;
  var _failed;
  var _showErrors;
}

// This exists so that checks can be made against null in an object-oriented approach
class Null {
  function Null() {}
};

private

function beginTests() {
  Debug.Log('Running Gunpowder specs...');
  run();
  testsToRun.Reverse();
  testCount += testsToRun.length;
  Start();
}

function runNextTest() {
  if(testsToRun.length == 1) { testsFinished = true; }
  var nextTest = testsToRun.Pop();
  for(var before in nextTest['befores']) { before(); }
  nextTest['test']();
}

function updateTestResults() {
  if(failedExpectation) { 
    failCount++;
    failedExpectation = false;
  }
}