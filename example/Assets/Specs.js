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
          var startLink;
          var quitLink;
          beforeEach(function() {
            startLink = find('Start Link');
            quitLink = find('Quit Link');
          });
          
          it('adds a blue highlight to the start link', function() {
            startLink.mouseEnter('Menu');
            expect(startLink).toHaveColor(Color.blue);
          });
          
          it('adds a blue highlight to the quit link', function() {
            quitLink.mouseEnter('Menu');
            expect(quitLink).toHaveColor(Color.blue);
          });
          
          context('and then hovering off', function() {
            it('removes the blue highlight from the start link', function() {
              startLink.mouseEnter('Menu').mouseExit('Menu');
              expect(startLink).toHaveColor(Color.white);
            });
            
            it('removes the blue highlight from the quit link', function() {
              quitLink.mouseEnter('Menu').mouseExit('Menu');
              expect(quitLink).toHaveColor(Color.white);
            });
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