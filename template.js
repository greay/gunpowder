class MySceneSpec extends gunpowder {
  function run() {
    describe('my game tests', function() {
      beforeEach(function() {
        loadScene('your scene name here');
      });
    });
  }
}