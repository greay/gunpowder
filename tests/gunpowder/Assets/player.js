function Update() {
  var inputValueX = gunpowder.Input.GetAxis('Vertical');
  var inputValueZ = gunpowder.Input.GetAxis('Horizontal');
  transform.position.x += inputValueX;
  transform.position.z += inputValueZ;
}