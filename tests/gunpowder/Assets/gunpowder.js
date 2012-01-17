var _ = function(object) { return 0; };
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
  
  function not() {
    _negate = true;
    return this;
  }
  
  var _actual;
  var _negate;
}