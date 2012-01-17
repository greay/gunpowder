class specs extends gunpowder {
  function Start() {
    describe('gunpowder', function() {
      describe('selector', function() {
        it('can find the game object', function() {
          expect(_('box')).toEqual(GameObject.Find('box'));
        });
      });
      
      describe('matchers', function() {
        describe('toEqual', function() {
          it('equals', function() {
            expect(1).toEqual(1);
          });
          
          it('does not equal', function() {
            expect(3).not().toEqual(1);
          });
        });
        
        describe('toHavePosition', function() {
          it('has the correct position', function() {
            _('box').transform.position = new Vector3(1, 2, 3);
            expect(_('box')).toHavePosition(1, 2, 3);
          });
          
          it('does not have correct position', function() {
            _('box').transform.position = new Vector3(4, 5, 6);
            expect(_('box')).not().toHavePosition(1, 2, 3);
          });
        });
      });
    });
  }
}