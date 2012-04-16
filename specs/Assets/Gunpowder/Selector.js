class Selector {  
  function find(selector) {
    _gameObject = GameObject.Find(selector);
    return this;
  }

  function moveTo(x, y, z) {
    _gameObject.transform.position = new Vector3(x, y, z);
    return this;
  }
  
  function mouseEnter(scriptName) {
    _gameObject.GetComponent(scriptName).OnMouseEnter();
    return this;
  }
  
  function mouseExit(scriptName) {
    _gameObject.GetComponent(scriptName).OnMouseExit();
    return this;
  }

  function gameObject() {
    return _gameObject;
  }

  var _gameObject;
}
