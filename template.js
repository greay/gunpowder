class MySceneSpec extends Gunpowder {
  function run() {
    describe('my game tests', function() {
      beforeEach(function() {
        loadScene('your scene name here');
      });
      
      describe('when the game starts', function() {
        it('should not show my game object', function() {
          expect(find('my game object name')).toBeHidden();
        });
      })
    });
  }
}