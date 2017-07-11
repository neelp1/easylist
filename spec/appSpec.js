describe('MyApp', function(){
  var someVal;
  beforeEach(function(){
    // module('MyApp');
    console.log("before each...");
    someVal = 2;
  });

  // beforeEach(module('MyApp'));

  describe('#sqrt()', function() {
    it('should return 4 for square root of 16', function() {
      // assert.equal(4, Math.sqrt(16));
      expect(Math.sqrt(16)).toEqual(4);
    });
  });

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expect([1,2,3].indexOf(4)).toEqual(-1);
    });
  });

  describe('#==', function() {
    it('should return true when someVal equals 2', function() {
      // assert.equal(2, someVal);
      expect(someVal).toEqual(2);
    });
  });
});
