var _ = function(selector) { return new Selector(selector); };

var context = function(name, func) { func(); };
var describe = function(name, func) { func(); };
var expect = function(actual) { return new Matcher(actual); };
var it = function(name, func) { testsToRun.Push(func); };

function run() {}

static var testsToRun = new Array();
static var testsFinished = false;

function Start() {
	if(!testsFinished) {
		if(testsToRun.length == 0) {
			run();
		} else {
			if(testsToRun.length == 1) { testsFinished = true; }
			var nextTest = testsToRun.Pop();
			nextTest();
		}
		Application.LoadLevel('test');
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
  function Matcher(actual) {
		if(actual.GetType() == typeof(Selector)) {
			_actual = actual.getGameObject();
		} else {
			_actual = actual;
		}
    _negate = false;
    _failed = false;
  }
  
  function toBeTruthy() {
    if(_actual != true) {
      Debug.LogError('Expected ' + _actual + ' to be truthy');
      _failed = true;
    }
    
    return this;
  }
  
  function toBeFalsy() {
    if(_actual != false) {
      Debug.LogError('Expected ' + _actual + ' to be falsy');
      _failed = true;
    }
    
    return this;
  }
  
  function toEqual(expected) {
    if(_negate) {
      if(_actual == expected) {
        Debug.LogError('Expected ' + _actual + ' not to equal ' + expected);
        _failed = true;
      }
    } else {
      if(_actual != expected) {
        Debug.LogError('Expected ' + _actual + ' to equal ' + expected);
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
        Debug.LogError('Expected ' + _actual.name + ' not to have position ' + expectedPosition + ' but got ' + actualPosition);
      }
    } else {
      if(Vector3.Distance(actualPosition, expectedPosition) != 0) {
        Debug.LogError('Expected ' + _actual.name + ' to have position ' + expectedPosition + ' but got ' + actualPosition);
      } 
    }
  }

	function toBeVisible() {
		if(_negate) {
			if(_actual.renderer.enabled) {
				Debug.LogError('Expected ' + _actual.name + ' not to be visible');
			}
		} else {
			if(!_actual.renderer.enabled) {
				Debug.LogError('Expected ' + _actual.name + ' to be visible');
			}
		}
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
}