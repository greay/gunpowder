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
var expect = function(actual) { return new Matcher(actual, true); };
var match = function(actual) { return new Matcher(actual, false); };
var it = function(name, func) {
  testsToRun.Push({'befores' : new Array(beforesToRun), 'test' : func}); 
};

function run() {}

static var testsToRun = new Array();
static var beforesToRun = new Array();
static var testsFinished = false;
static var sceneName;

function Start() {
 if(!testsFinished) {
   if(testsToRun.length == 0) {
     run();
     testsToRun.Reverse();
     Start();
   } else {
     if(testsToRun.length == 1) { testsFinished = true; }
     var nextTest = testsToRun.Pop();
     for(var before in nextTest['befores']) {
       before();
     }
     nextTest['test']();
     Application.LoadLevel(sceneName);
   }
 } else {
   Debug.Log('Finished running specs!');
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
  function Matcher(actual, showErrors) {
    _negate = false;
    _failed = false;
    _showErrors = showErrors;
    
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
  
  function printError(message) {
    if(_showErrors) {
      Debug.LogError(message);
    }
  }
  
  function toExist() {
    var actual_exists = _actual != null && typeof(_actual) != Null;

    if(_negate) {
      if(actual_exists) {
        printError("Expected "+ _actual +" not to exist");
        _failed = true;
      }
    } else {
      if(!actual_exists) {
        printError("Expected "+ _actual +" to exist");
        _failed = true;
      }
    }

    return this;
  }

  function toBeTruthy() {
    if(_negate) {
      if(_actual == true) {
        printError('Expected ' + _actual + ' not to be truthy');
        _failed = true;
      }
    } else {
      if(_actual != true) {
        printError('Expected ' + _actual + ' to be truthy');
        _failed = true;
      }
    }
    
    return this;
  }
  
  function toBeFalsy() {
    if(_negate) {
      if(_actual == false) {
        printError('Expected ' + _actual + ' not to be falsy');
        _failed = true;
      }
    } else {
      if(_actual != false) {
        printError('Expected ' + _actual + ' to be falsy');
        _failed = true;
      }
    }
    
    return this;
  }
  
  function toEqual(expected) {
    if(_negate) {
      if(_actual == expected) {
        printError('Expected ' + _actual + ' not to equal ' + expected);
        _failed = true;
      }
    } else {
      if(_actual != expected) {
        printError('Expected ' + _actual + ' to equal ' + expected);
        _failed = true;
      }
    }
    
    return this;
  }
  
  function toHavePosition(expectedX, expectedY, expectedZ) {
    var actualPosition = _actual.transform.position;
    var expectedPosition = new Vector3(expectedX, expectedY, expectedZ);
    
    if(_negate) {
      if(Vector3.Distance(actualPosition, expectedPosition) == 0) {
        printError('Expected ' + _actual.name + ' not to have position ' + expectedPosition + ' but got ' + actualPosition);
        _failed = true;
      }
    } else {
      if(Vector3.Distance(actualPosition, expectedPosition) != 0) {
        printError('Expected ' + _actual.name + ' to have position ' + expectedPosition + ' but got ' + actualPosition);
        _failed = true;
      } 
    }
    
    return this;
  }

 function toBeVisible() {
   if(_negate) {
     if(_actual.renderer.enabled) {
       printError('Expected ' + _actual.name + ' not to be visible');
       _failed = true;
     }
   } else {
     if(!_actual.renderer.enabled) {
       printError('Expected ' + _actual.name + ' to be visible');
       _failed = true;
     }
   }
   
   return this;
 }
 
 function toBeHidden() {
   if(_negate) {
     if(!_actual.renderer.enabled) {
       printError('Expected ' + _actual.name + ' not to be hidden');
       _failed = true;
     }
   } else {
     if(_actual.renderer.enabled) {
       printError('Expected ' + _actual.name + ' to be hidden');
       _failed = true;
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
      Debug.LogError('Expected to pass but failed');
    }
  }
  
  function toFail() {
    if(!_failed) {
      Debug.LogError('Expected to fail but passed');
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