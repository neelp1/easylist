var assert = require('assert');
// var mocha = require('mocha');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

//TODO: fill db with names with before() or beforeEach()
//TODO: delete names in db with after() or afterEach()
//TODO: stub $scope.items if possible to test postData() or deleteNames()
// describe('easy_angular', function(){
//   // var scope, createController;
//
//   beforeEach(module('mainController'));
//
//   describe('#testFunction()', function(){
//     it('should return the value 10 if given 5', function(){
//       assert.equal(10, $scope.testFunction(5));
//     });
//   });
// });
