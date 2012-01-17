var _ = function(selector) { return GameObject.Find(selector); };
var context = function(name, func) { func(); };
var describe = function(name, func) { func(); };
var it = function(name, func) { func(); };
var expect = function(actual) { return new Matcher(actual); };

class Matcher {
  function Matcher(actual) { 
    _actual = actual;
    _negate = false; 
  }
  
  function toEqual(expected) {
    if(_negate) {
      if(_actual == expected) {
        Debug.LogError('Expected ' + _actual + ' not to equal ' + expected);
      }
    } else {
      if(_actual != expected) {
        Debug.LogError('Expected ' + _actual + ' to equal ' + expected);
      }
    }
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
  
  function not() {
    _negate = true;
    return this;
  }
  
  var _actual;
  var _negate;
}