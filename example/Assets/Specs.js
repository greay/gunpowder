class Specs extends Gunpowder {
  function run() {
    describe('Pizza Eater', function() {
      describe('main menu', function() {
        beforeEach(function() {
          loadScene('menu');
        });
        
        it('plays the awesome intro music');
        
        it('shows a start game link');
        
        it('shows a quit game link');
        
        context('seleting start game', function() {
          it('starts the game');
        });
        
        context('selecting quit game', function() {
          it('quits the game');
        });
      });
    });
  }
}