class Specs extends Gunpowder {
  function run() {
    describe('gunpowder', function() {
      beforeEach(function() {
        loadScene('test');
      });

      describe('pending tests', function() {
        it('will test something');

        xit('is failing', function() {
          expect(match(1).toEqual(5)).toPass();
        });
      });

      describe('selector', function() {
        it('can find the game object', function() {
          expect(match(_('box')).toEqual(GameObject.Find('box'))).toPass();
          expect(match(_('box')).toEqual(GameObject.Find('ball'))).toFail();
        });

        describe('simulate', function() {
          describe('axis', function() {
            it('moves forward', function() {
              _().simulate().axis('forward', 5, function() {
                expect(_('player')).toHavePosition(2.1, 0.5, -13.0, 0.5);
              });
            });

            it('moves backwards', function() {
              _().simulate().axis('backward', 5, function() {
                expect(_('player')).toHavePosition(1.1, 0.5, -13.0, 0.5);
              });
            });

            it('moves right', function() {
              _().simulate().axis('right', 5, function() {
                expect(_('player')).toHavePosition(1.6, 0.5, -12.5, 0.5);
              });
            });

            it('moves left', function() {
              _().simulate().axis('left', 5, function() {
                expect(_('player')).toHavePosition(1.6, 0.5, -13.5, 0.5);
              });
            });

            it('can run multiple movements in a single test', function() {
              _().simulate().axis('backward', 5, function() {
                expect(_('player')).toHavePosition(1.1, 0.5, -13.0, 0.5);
              });

              _().simulate().axis('left', 5, function() {
                expect(_('player')).toHavePosition(1.1, 0.5, -14.0, 0.5);
              });
            });
          });

          describe('buttonPress', function() {
            it('presses the "control" button', function() {
              expect(_('ball')).toBeVisible();
              _().simulate().buttonPress('Fire1', 1, function() {
                expect(_('ball')).toBeHidden();
              });
            });
          });

          describe('keyPress', function() {
            it('presses the "control" key', function() {
              expect(_('box')).toBeVisible();
              _().simulate().keyPress('h', 1, function() {
                expect(_('box')).toBeHidden();
              });
            });
          });
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

        describe("toExist", function() {
          it("is null", function() {
            expect(match(null).not().toExist()).toPass();
            expect(match(null).toExist()).toFail();
          });

          it("exists in scene", function() {
            expect(match(_('box')).toExist()).toPass();
            expect(match(_('box')).not().toExist()).toFail();
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

      describe('beforeEach', function() {
        var number = 0;
        beforeEach(function() {
          number++;
        });

        it('increments the number', function() {
          expect(number).toEqual(1);
        });

        describe('nested beforeEach', function() {
          beforeEach(function() {
            number--;
          });

          it('increments and decrements the number', function() {
            expect(number).toEqual(1);
          });

          describe('another nested beforeEach', function() {
            beforeEach(function() {
              number--;
            });

            it('increments and double decrements the number', function() {
              expect(number).toEqual(0);
            });
          });
        });

        context('another nested beforeEach', function() {
          beforeEach(function() {
            number++;
          });

          it('double increments the number', function() {
            expect(number).toEqual(2);
          });
        });

        it('increments the number again', function() {
          expect(number).toEqual(3);
        });
      });
    });
  }
}