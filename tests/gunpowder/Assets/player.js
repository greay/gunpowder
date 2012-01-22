function Update() {
  var inputValueX = Gunpowder.Input.GetAxis('Vertical');
  var inputValueZ = Gunpowder.Input.GetAxis('Horizontal');
  transform.position.x += inputValueX;
  transform.position.z += inputValueZ;
}