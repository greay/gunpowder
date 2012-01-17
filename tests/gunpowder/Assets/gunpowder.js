function G(objectName) { return new Selector(objectName); };
function G() { return G(''); };

var context = function(name, func) { func(); };
var describe = function(name, func) { func(); };
var it = function(name, func) {
  if(gunpowder.stopLoading == false)
    gunpowder.tests.Push(func);
};
var expect = function(gameObject) { return new Matchers(gameObject); };

static var unitsToMove = 0;
static var expectationToCall;
static var tests = new Array();
static var runningTest = false;
static var stopLoading = false;

class Selector {
  var _gameObject;
  
  function Selector(objectName) {
    _gameObject = GameObject.Find(objectName);
  }
  
  function getGameObject() {
    return _gameObject;
  }
  
  function moveForward(units, func) {
    gunpowder.unitsToMove = units;
    gunpowder.expectationToCall = func;
  }
}

class Matchers {
  var _gameObject;
  function Matchers(gameObject) {
  	Debug.Log('new Matchers'); 
  	_gameObject = gameObject.getGameObject(); 
  }
  
  function toHavePosition(x, y, z) {
    var position = _gameObject.transform.position;
    if(Vector3.Distance(position, Vector3(x, y, z)) != 0.0) {
      var message = "Expected " + _gameObject.name + " to have position " + Vector3(x, y, z) + " but got " + position;
      Debug.LogError(message);
    }
    gunpowder.runningTest = false;
  };
}

function inputGetAxis(axis) {
  if(axis == 'Vertical') {
    if(gunpowder.unitsToMove != 0) {
      gunpowder.unitsToMove--;
      return gunpowder.unitsToMove;
    } else {
      if(gunpowder.expectationToCall) {
        gunpowder.expectationToCall();
        gunpowder.expectationToCall = null;
      }
      gunpowder.unitsToMove = 0;
      return Input.GetAxis(axis);
    } 
  }
}

function Update() {
  gunpowder.stopLoading = true;
  if(gunpowder.tests.length != 0 && gunpowder.runningTest == false) {
    var nextTest = gunpowder.tests.Pop();
    gunpowder.runningTest = true;
    Debug.Log('test');
    Application.LoadLevel(0);
    nextTest();
  }
}

function Awake() {
	DontDestroyOnLoad(this);
}