class Specs extends Gunpowder {
  function run() {
    describe('Pizza Eater', function() {
      describe('main menu', function() {
        beforeEach(function() { loadScene('menu'); });
        
        it('plays the awesome intro music');
        
        it('shows a start game link', function() {
          expect(find('Start Link')).toExist();
        });
        
        it('shows a quit game link', function() {
          expect(find('Quit Link')).toExist();
        });
        
        context('hovering over the links', function() {
          it('adds a blue highlight to the start link', function() {
            var startLink = find('Start Link');
            startLink.mouseEnter('Menu');
            expect(startLink).toHaveColor(Color.blue);
          });
          
          it('adds a blue highlight to the quit link', function() {
            var quitLink = find('Quit Link');
            quitLink.mouseEnter('Menu');
            expect(quitLink).toHaveColor(Color.blue);
          });
        });
        
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