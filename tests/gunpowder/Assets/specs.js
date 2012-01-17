class Spec extends gunpowder {
  function Start() {
    describe('gunpowder', function() {
      describe('selector', function() {
        it('returns the correct gameobject', function() {
          // expect(_('box')).toEqual(GameObject.Find('box'));
          // expect(_('box')).not.toEqual(GameObject.Find('sphere'));
        });
      });
      
      describe('matchers', function () {
        describe('toHavePosition', function() {
          it('has the correct position', function() {
            // newPosition = new Vector3(1, 2, 3);
            // GameObject.Find('box').transform.position = newPosition;
            // expect(_('box')).toHavePosition(1, 2, 3);
          });
        });
      });
    });
  }
}