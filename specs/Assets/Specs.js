class Specs extends Gunpowder {
  function run() {
    describe('gunpowder', function() {
      beforeEach(function() {
        loadScene('test');
      });

      describe('pending specs', function() {
        it('will test something');

        xit('is failing', function() {
          expect(match(1).toEqual(5)).toPass();
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
            expect(match(find('box')).toExist()).toPass();
            expect(match(find('box')).not().toExist()).toFail();
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
            find('box').getGameObject().transform.position = new Vector3(1, 2, 3);
            expect(match(find('box')).toHavePosition(1, 2, 3)).toPass();
            expect(match(find('box')).toHavePosition(3, 2, 1)).toFail();
          });

          it('does not have the correct position', function() {
            find('box').getGameObject().transform.position = new Vector3(1, 2, 3);
            expect(match(find('box')).not().toHavePosition(3, 2, 1)).toPass();
            expect(match(find('box')).not().toHavePosition(1, 2, 3)).toFail();
          });
        });

        describe('toBeVisible', function() {
          it('is visible', function() {
            find('ball').getGameObject().renderer.enabled = true;
            expect(match(find('ball')).toBeVisible()).toPass();

            find('ball').getGameObject().renderer.enabled = false;
            expect(match(find('ball')).toBeVisible()).toFail();
          });

          it('is not visible', function() {
            find('ball').getGameObject().renderer.enabled = false;
            expect(match(find('ball')).not().toBeVisible()).toPass();

            find('ball').getGameObject().renderer.enabled = true;
            expect(match(find('ball')).not().toBeVisible()).toFail();
          });
        });

        describe('toBeHidden', function() {
          it('is hidden', function() {
            find('box').getGameObject().renderer.enabled = false;
            expect(match(find('box')).toBeHidden()).toPass();

            find('box').getGameObject().renderer.enabled = true;
            expect(match(find('box')).toBeHidden()).toFail();
          });

          it('is not hidden', function() {
            find('box').getGameObject().renderer.enabled = true;
            expect(match(find('box')).not().toBeHidden()).toPass();

            find('box').getGameObject().renderer.enabled = false;
            expect(match(find('box')).not().toBeHidden()).toFail();
          });
        });
      });

      describe('helpers', function() {
        describe('find', function() {
          it('can find the game object', function() {
            expect(match(find('box')).toEqual(GameObject.Find('box'))).toPass();
            expect(match(find('box')).toEqual(GameObject.Find('ball'))).toFail();
          });
        });

        describe('move', function() {
          it('moves forward', function() {
            move('forward', 100, function() {
              expect(find('player')).toHavePosition(2.1, 0.5, -13.0, 0.5);
            });
          });

          it('moves backwards', function() {
            move('backward', 100, function() {
              expect(find('player')).toHavePosition(1.1, 0.5, -13.0, 0.5);
            });
          });

          it('moves right', function() {
            move('right', 100, function() {
              expect(find('player')).toHavePosition(1.6, 0.5, -12.5, 0.5);
            });
          });

          it('moves left', function() {
            move('left', 100, function() {
              expect(find('player')).toHavePosition(1.6, 0.5, -13.5, 0.5);
            });
          });

          it('can run multiple movements in a single spec', function() {
            move('backward', 100, function() {
              expect(find('player')).toHavePosition(1.1, 0.5, -13.0, 0.5);
            });

            move('left', 100, function() {
              expect(find('player')).toHavePosition(1.1, 0.5, -14.0, 0.5);
            });
          });
        });

        describe('pressButton', function() {
          it('presses the "control" button', function() {
            expect(find('ball')).toBeVisible();
            pressButton('Fire1', 500, function() {
              expect(find('ball')).toBeHidden();
            });
          });
        });

        describe('pressKey', function() {
          it('presses the "control" key', function() {
            expect(find('box')).toBeVisible();
            pressKey('h', 500, function() {
              expect(find('box')).toBeHidden();
            });
          });
        });

        describe('moveTo', function() {
          it('moves the object to the correct location', function() {
            find('ball').moveTo(0, 3, 2);
            expect(find('ball').getGameObject().transform.position.x).toEqual(0);
            expect(find('ball').getGameObject().transform.position.y).toEqual(3);
            expect(find('ball').getGameObject().transform.position.z).toEqual(2);
          });
        });

        describe('waits', function() {
          it('waits the specified time then runs the callback', function() {
            find('cylinder').getGameObject().AddComponent(Rigidbody);
            expect(find('plane')).toBeVisible();
            waits(300, function() {
              expect(find('plane')).toBeHidden();
            });
          });
        });
      });

      describe('resetting the scene', function() {
        context('a spec finishes', function() {
          var boxPosition = find('box').getGameObject().transform.position;
          var ballPosition = find('ball').getGameObject().transform.position;

          it('moves the objects', function() {
            find('box').moveTo(5, 5, 5);
            find('ball').moveTo(3, 3, 3);
          });

          it('resets the objects', function() {
            expect(find('box')).toHavePosition(boxPosition.x, boxPosition.y, boxPosition.z);
            expect(find('ball')).toHavePosition(ballPosition.x, ballPosition.y, ballPosition.z);
          });
        });
      });

      describe('beforeEach', function() {
        var number = 0;
        beforeEach(function() { number++; });

        it('increments the number', function() {
          expect(number).toEqual(1);
        });

        describe('nested beforeEach', function() {
          beforeEach(function() { number--; });

          it('increments and decrements the number', function() {
            expect(number).toEqual(1);
          });
        });

        it('increments the number again', function() {
          expect(number).toEqual(2);
        });
        
        it('increments the number yet again', function() {
          expect(number).toEqual(3);
        });
      });
      
      describe('afterEach', function() {
        var number = 3;
        afterEach(function() { number--; });

        it('does not change the number', function() {
          expect(number).toEqual(3);
        });

        describe('nested afterEach', function() {
          afterEach(function() { number++; });

          it('decrements the number', function() {
            expect(number).toEqual(2);
          });
          
          it('increments and decrements the number', function() {
            expect(number).toEqual(2);
          });
        });

        it('decrements the number again', function() {
          expect(number).toEqual(2);
        });
        
        it('decrements the number yet again', function() {
          expect(number).toEqual(1);
        });
      });
    });
  }
}