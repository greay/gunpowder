class Simulate {
  function movement(direction, duration, callback) {
    Gunpowder.simulationsToRun.Push({
      'duration': duration,
      'direction': direction,
      'callback': callback
    });
  }
}