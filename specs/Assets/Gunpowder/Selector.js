class Selector {  
  function find(selector) {
    _gameObject = GameObject.Find(selector);
    return this;
  }

  function moveTo(x, y, z) {
    _gameObject.transform.position = new Vector3(x, y, z);
  }
  
  function mouseEnter(scriptName) {
    _gameObject.GetComponent(scriptName).OnMouseEnter();
  }

  function gameObject() {
    return _gameObject;
  }

  var _gameObject;
}
