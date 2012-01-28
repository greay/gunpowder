class Simulate {
  function move(direction, duration, callback) {
    Gunpowder.simulationsToRun.Push({
      'duration': duration,
      'direction': direction,
      'callback': callback
    });
  }

  function buttonPress(button, duration, callback) {
    Gunpowder.simulationsToRun.Push({
      'duration': duration,
      'button': button,
      'callback': callback
    });
  }

  function keyPress(key, duration, callback) {
    Gunpowder.simulationsToRun.Push({
      'duration': duration,
      'key': key,
      'callback': callback
    });
  }
}