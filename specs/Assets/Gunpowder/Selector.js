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

  function simulate() { 
    return new Simulate(); 
  }

  var _gameObject;
}
