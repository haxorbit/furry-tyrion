var boot = require('../app').boot,
  shutdown = require('../app').shutdown,
  port = require('../app').port,
  superagent = require('superagent'),
  assert = require("assert"),
  expect = require('expect.js');

var C = require('../cash.js'); // our cash module

describe('server', function() {
  before(function() {
    boot();
  });
  describe('homepage', function() {
    it('should respond to GET', function(done) {
      superagent
        .get('http://localhost:' + port)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  after(function() {
    shutdown();
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    });
  })
});

describe('Cash Register', function() {
  describe('Module C', function() {
    it('should have a getChange Method', function() {
      assert.equal(typeof C, 'object');
      assert.equal(typeof C.getChange, 'function');
    });

    it('getChange(210, 300) should equal [50,20,20]', function() {
      assert.deepEqual(C.getChange(210, 300), [50, 20, 20]);
    });

    it('getChange(486, 1000) should equal [500, 10, 2, 2]', function() {
      assert.deepEqual(C.getChange(486, 1000), [500, 10, 2, 2]);
    });

    it('getChange(1487, 10000) should equal [5000, 2000, 1000, 500, 10, 2, 1 ]', function() {
      assert.deepEqual(C.getChange(1487, 10000), [5000, 2000, 1000, 500, 10, 2, 1]);
    });
  });
});
