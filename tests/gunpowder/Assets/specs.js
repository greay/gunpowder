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
        describe('toBeTruthy', function() {
          it('is true', function() {
            expect(match(true).toBeTruthy()).toPass();
            expect(match(false).toBeTruthy()).toFail();
          });
          
          it('is not true', function() {
            expect(match(false).not().toBeTruthy()).toPass();
            expect(match(true).not().toBeTruthy()).toFail();
          });
        });
        
        describe('toBeFalsy', function() {
          it('is false', function() {
            expect(match(false).toBeFalsy()).toPass();
            expect(match(true).toBeFalsy()).toFail();
          });
          
          it('is not false', function() {
            expect(match(true).not().toBeFalsy()).toPass();
            expect(match(false).not().toBeFalsy()).toFail();
          });
        });
        
        describe('toEqual', function() {
          it('equals', function() {
            expect(match(1).toEqual(1)).toPass();
            expect(match(1).toEqual(3)).toFail();
          });
          
          it('does not equal', function() {
            expect(match(3).not().toEqual(1)).toPass();
            expect(match(1).not().toEqual(1)).toFail();
          });
        });
        
        describe('toHavePosition', function() {
          it('has the correct position', function() {
            _('box').getGameObject().transform.position = new Vector3(1, 2, 3);
            expect(match(_('box')).toHavePosition(1, 2, 3)).toPass();
            expect(match(_('box')).toHavePosition(3, 2, 1)).toFail();
          });
          
          it('does not have the correct position', function() {
            _('box').getGameObject().transform.position = new Vector3(1, 2, 3);
            expect(match(_('box')).not().toHavePosition(3, 2, 1)).toPass();
            expect(match(_('box')).not().toHavePosition(1, 2, 3)).toFail();
          });
        });

				describe('toBeVisible', function() {
					it('is visible', function() {
						_('ball').getGameObject().renderer.enabled = true;
						expect(match(_('ball')).toBeVisible()).toPass();
						
						_('ball').getGameObject().renderer.enabled = false;
						expect(match(_('ball')).toBeVisible()).toFail();
					});
					
					it('is not visible', function() {
						_('ball').getGameObject().renderer.enabled = false;
						expect(match(_('ball')).not().toBeVisible()).toPass();
						
						_('ball').getGameObject().renderer.enabled = true;
						expect(match(_('ball')).not().toBeVisible()).toFail();
					});
				});
				
				describe('toBeHidden', function() {
					it('is hidden', function() {
						_('box').getGameObject().renderer.enabled = false;
						expect(match(_('box')).toBeHidden()).toPass();
						
						_('box').getGameObject().renderer.enabled = true;
						expect(match(_('box')).toBeHidden()).toFail();
					});
					
					it('is not hidden', function() {
						_('box').getGameObject().renderer.enabled = true;
						expect(match(_('box')).not().toBeHidden()).toPass();
						
						_('box').getGameObject().renderer.enabled = false;
						expect(match(_('box')).not().toBeHidden()).toFail();
					});
				});
      });

			describe('resetting the scene', function() {
				context('a test finishes', function() {
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