class specs extends gunpowder {
  function Start() {
    describe('gunpowder', function() {
      describe('expectations', function() {
        it('can compare objects', function() {
          expect(1).toEqual(1);
          expect(3).not().toEqual(1);
        });
      });
    });
  }
}