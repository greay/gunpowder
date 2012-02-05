class Simulate {
  function move(direction, milliseconds, callback) {
    Gunpowder.simulationsToRun.Push({
      'milliseconds': milliseconds,
      'direction': direction,
      'callback': callback
    });
  }

  function buttonPress(button, milliseconds, callback) {
    Gunpowder.simulationsToRun.Push({
      'milliseconds': milliseconds,
      'button': button,
      'callback': callback
    });
  }

  function keyPress(key, milliseconds, callback) {
    Gunpowder.simulationsToRun.Push({
      'milliseconds': milliseconds,
      'key': key,
      'callback': callback
    });
  }
  
  function waits(milliseconds, callback) {
    Gunpowder.simulationsToRun.Push({
      'milliseconds': milliseconds,
      'callback': callback
    });
  }
}