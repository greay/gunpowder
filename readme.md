Gunpowder will eventually be a BDD tool for Unity3D using the Jasmine style DSL.

Example:

class MyScene extends Gunpowder {
  function Start() {
    
    describe('my scene', function() {
      context('when the game starts', function() {
        it('places the player in the correct location', function() {
          expect(_('Player 1')).toHavePosition(0, 0, 0);
        });
        
        it('hides the magical sphere', function() {
          expect(_('Magical Sphere')).toBeHidden();
        });
      });
      
      context('when the player hits the brick wall', function() {
        it('shows the magical sphere', function() {
          _('Player 1').moveTo(1, 1, 1);
          _().triggerKey('Up', 10);
          expect(_('Magical Sphere')).toBeVisible();
        });
      });
    });
    
  }
} 