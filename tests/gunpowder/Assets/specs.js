class specs extends gunpowder {
  function run() {
    describe('gunpowder', function() {
      describe('selector', function() {
        it('can find the game object', function() {
          expect(_('box')).toEqual(GameObject.Find('box'));
        });

				describe('actions', function() {
					describe('moveTo', function() {
						it('moves the object to the correct location', function() {
							_('ball').moveTo(0, 3, 2);
							expect(_('ball').getGameObject().transform.position.x).toEqual(0);
							expect(_('ball').getGameObject().transform.position.y).toEqual(3);
							expect(_('ball').getGameObject().transform.position.z).toEqual(2);
						});
					});
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
            _('box').getGameObject().transform.position = new Vector3(1, 2, 3);
            expect(_('box')).toHavePosition(1, 2, 3);
          });
          
          it('does not have correct position', function() {
            _('box').getGameObject().transform.position = new Vector3(4, 5, 6);
            expect(_('box')).not().toHavePosition(1, 2, 3);
          });
        });

				describe('toBeVisible', function() {
					it('is visible', function() {
						_('ball').getGameObject().renderer.enabled = true;
						expect(_('ball')).toBeVisible();
					});
					
					it('is not visible', function() {
						_('ball').getGameObject().renderer.enabled = false;
						expect(_('ball')).not().toBeVisible();
					});
				});
      });

			describe('resetting scene', function() {
				context('after an "it" finishes', function() {
					var boxPosition = _('box').getGameObject().transform.position;
					var ballPosition = _('ball').getGameObject().transform.position;
					
					it('moves the objects', function() {
						_('box').moveTo(5, 5, 5);
						_('ball').moveTo(3, 3, 3);
					});
					
					it('resets the objects', function() {
						expect(_('box')).toHavePosition(boxPosition.x, boxPosition.y, boxPosition.z);
						expect(_('ball')).toHavePosition(ballPosition.x, ballPosition.y, ballPosition.z);
					});
				});
			});
    });
  }
}