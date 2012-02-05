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
        _actual = actual.gameObject();
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
      Gunpowder.failedExpectation = true;
      Gunpowder.failedExpectations.Push(Gunpowder.currentSpecContext + ' > ' + message);
    }
    _failed = true;
  }

  function toExist() {
    var actual_exists = _actual != null && typeof(_actual) != Null;

    if(_negate) {
      if(actual_exists) {
        failed("expected "+ _actual +" not to exist");
      }
    } else {
      if(!actual_exists) {
        failed("expected "+ _actual +" to exist");
      }
    }

    return this;
  }

  function toBeTruthy() {
    if(_negate) {
      if(_actual == true) {
        failed('expected ' + _actual + ' not to be truthy');
      }
    } else {
      if(_actual != true) {
        failed('expected ' + _actual + ' to be truthy');
      }
    }

    return this;
  }

  function toBeFalsy() {
    if(_negate) {
      if(_actual == false) {
        failed('expected ' + _actual + ' not to be falsy');
      }
    } else {
      if(_actual != false) {
        failed('expected ' + _actual + ' to be falsy');
      }
    }

    return this;
  }

  function toEqual(expected) {
    if(_negate) {
      if(_actual == expected) {
        failed('expected ' + _actual + ' not to equal ' + expected);
      }
    } else {
      if(_actual != expected) {
        failed('expected ' + _actual + ' to equal ' + expected);
      }
    }

    return this;
  }

  function toHavePosition(expectedX, expectedY, expectedZ) {
    return toHavePosition(expectedX, expectedY, expectedZ, 0.0);
  }

  function toHavePosition(expectedX, expectedY, expectedZ, within) {
    var actualPosition = _actual.transform.position;
    var expectedPosition = new Vector3(expectedX, expectedY, expectedZ);

    if(_negate) {
      if(Vector3.Distance(actualPosition, expectedPosition) <= within) {
        failed('expected ' + _actual.name + ' not to have position ' + expectedPosition + ' but got ' + actualPosition);
      }
    } else {
      if(Vector3.Distance(actualPosition, expectedPosition) > within) {
        failed('expected ' + _actual.name + ' to have position ' + expectedPosition + ' but got ' + actualPosition);
      } 
    }

    return this;
  }

  function toBeVisible() {
    if(_negate) {
      if(_actual.renderer.enabled) {
        failed('expected ' + _actual.name + ' not to be visible');
      }
    } else {
      if(!_actual.renderer.enabled) {
        failed('expected ' + _actual.name + ' to be visible');
      }
    }

    return this;
  }

  function toBeHidden() {
    if(_negate) {
      if(!_actual.renderer.enabled) {
        failed('expected ' + _actual.name + ' not to be hidden');
      }
    } else {
      if(_actual.renderer.enabled) {
        failed('expected ' + _actual.name + ' to be hidden');
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
      failed('expected to pass but failed');
    }
  }

  function toFail() {
    if(!_failed) {
      failed('expected to fail but passed');
    }
  }

  var _actual;
  var _negate;
  var _failed;
  var _showErrors;
}