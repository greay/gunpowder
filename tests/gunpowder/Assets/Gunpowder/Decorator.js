class Decorator {
  function GetAxis(axis) {
    var speed = 0.0;
    
    if(Gunpowder.currentSimulation != {}) {
      var direction = Gunpowder.currentSimulation['direction'];
      if(direction == 'forward' && axis == 'Vertical') {
        speed = 0.1;
      } else if(direction == 'backward' && axis == 'Vertical') {
        speed = -0.1;
      } else if(direction == 'left' && axis == 'Horizontal') {
        speed = -0.1;
      } else if(direction == 'right' && axis == 'Horizontal') {
        speed = 0.1;
      }
      
      return speed;
    } else {
      return Input.GetAxis(axis);
    }
  }
}