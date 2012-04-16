class Specs extends Gunpowder {
  function run() {
    describe('gunpowder', function() {
      beforeEach(function() {
        loadScene('test');
      });
      
      describe('test results', function() {
        describe('passing specs', function() {
          it('passes', function() {
            expect(1).toEqual(1);
            expect(failedExpectations.length).toEqual(0);
          });
          
          it('shows the right output', function() {
            var match = Regex.Match(specResults(), "PASS: (.+) specs, 0 failures, (.+) pending, (.+) secs.");
            expect(match.Success).toBeTruthy();
          });
        });
        
        describe('failing specs', function() {
          it('fails', function() {
            expect(5).toEqual(1);
            expect(failedExpectations.Pop()).toEqual('gunpowder > test results > failing specs > fails > expected 5 to equal 1');
          });
          
          context('another failure', function() {
            it('fails again', function() {
              expect(true).toBeFalsy(); 
              expect(failedExpectations.Pop()).toEqual('gunpowder > test results > failing specs > another failure > fails again > expected True to be falsy');
            });
          });
          
          it('shows the right output', function() {
            var match = Regex.Match(specResults(), "FAIL: (.+) specs, 2 failures, (.+) pending, (.+) secs.");
            expect(match.Success).toBeTruthy();
            failCount -= 2; // Hide these test errors from the real test results output
          });
        });
        
        describe('pending specs', function() {
          it('will test something');

          xit('is failing', function() {
            expect(1).toEqual(5);
          });
          
          it('shows the right output', function() {
            var match = Regex.Match(specResults(), "PASS: (.+) specs, 0 failures, 2 pending, (.+) secs.");
            expect(match.Success).toBeTruthy();
            pendingCount -= 2; // Hide these pending tests from the real test results output
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
            find('box').gameObject().transform.position = new Vector3(1, 2, 3);
            expect(match(find('box')).toHavePosition(1, 2, 3)).toPass();
            expect(match(find('box')).toHavePosition(3, 2, 1)).toFail();
          });

          it('does not have the correct position', function() {
            find('box').gameObject().transform.position = new Vector3(1, 2, 3);
            expect(match(find('box')).not().toHavePosition(3, 2, 1)).toPass();
            expect(match(find('box')).not().toHavePosition(1, 2, 3)).toFail();
          });
        });

        describe('toBeVisible', function() {
          it('is visible', function() {
            find('ball').gameObject().renderer.enabled = true;
            expect(match(find('ball')).toBeVisible()).toPass();

            find('ball').gameObject().renderer.enabled = false;
            expect(match(find('ball')).toBeVisible()).toFail();
          });

          it('is not visible', function() {
            find('ball').gameObject().renderer.enabled = false;
            expect(match(find('ball')).not().toBeVisible()).toPass();

            find('ball').gameObject().renderer.enabled = true;
            expect(match(find('ball')).not().toBeVisible()).toFail();
          });
        });

        describe('toBeHidden', function() {
          it('is hidden', function() {
            find('box').gameObject().renderer.enabled = false;
            expect(match(find('box')).toBeHidden()).toPass();

            find('box').gameObject().renderer.enabled = true;
            expect(match(find('box')).toBeHidden()).toFail();
          });

          it('is not hidden', function() {
            find('box').gameObject().renderer.enabled = true;
            expect(match(find('box')).not().toBeHidden()).toPass();

            find('box').gameObject().renderer.enabled = false;
            expect(match(find('box')).not().toBeHidden()).toFail();
          });
        });
        
        describe('toHaveColor', function() {
          it('has the correct color', function() {
            var box = find('box');
            box.gameObject().renderer.material.color = Color.red;
            expect(match(box).toHaveColor(Color.red)).toPass();
          });
          
          it('does not have the correct color', function() {
            var box = find('box');
            box.gameObject().renderer.material.color = Color.red;
            expect(match(box).toHaveColor(Color.blue)).toFail();
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
              expect(find('player')).toHavePosition(1.1, 0.5, -13.0, 0.8);
            });

            move('left', 100, function() {
              expect(find('player')).toHavePosition(1.1, 0.5, -14.0, 0.8);
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
            expect(find('ball').gameObject().transform.position.x).toEqual(0);
            expect(find('ball').gameObject().transform.position.y).toEqual(3);
            expect(find('ball').gameObject().transform.position.z).toEqual(2);
          });
        });

        describe('waits', function() {
          it('waits the specified time then runs the callback', function() {
            find('cylinder').gameObject().AddComponent(Rigidbody);
            expect(find('plane')).toBeVisible();
            waits(300, function() {
              expect(find('plane')).toBeHidden();
            });
          });
        });
      
        describe('mouseEnter', function() {
          it('triggers the OnMouseEnter on the object', function() {
            var ball = find('ball');
            ball.mouseEnter('ball');
            expect(ball).toHaveColor(Color.green);    
          });
        });
        
        describe('mouseExit', function() {
          it('triggers the OnMouseExit on the object', function() {
            var ball = find('ball');
            ball.mouseExit('ball');
            expect(ball).toHaveColor(Color.yellow);    
          });
        });
      });

      describe('resetting the scene', function() {
        context('a spec finishes', function() {
          var boxPosition = find('box').gameObject().transform.position;
          var ballPosition = find('ball').gameObject().transform.position;

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