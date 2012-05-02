var assert = require('assert')
  , auth = require('../auth')
  , middleware = require('../middleware')
  , sandboxed_module = require('sandboxed-module')
  , should = require('should')
  , sinon = require('sinon')
  , index = require('../routes/index')
  ;
  
describe('index', function() {
  describe('#timesTwo()', function() {
    it('should multiply by two', function() {
      var x = 5;
      var xTimesTwo = index.timesTwo(x);
      xTimesTwo.should.equal(10);
    });
  });
});