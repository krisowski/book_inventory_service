var request = require('supertest');
var assert = require('assert');
var sum = require('../sum')
var app = require('../app.js')(require('../inMemoryStockRepository')());

describe('Math in JS', function() {
  it('should support addition', function() {
      assert.equal(sum(1, 1), 2);
  });
});

/*
describe('Math in JS', function() {
  it('should support addition', function() {
    setTimeout(function() {
      assert.equal(sum(1+1), 2);
      //done();
    }, 0);
  });
});
*/

describe('Test JSON', function() {
  it('respond with json', function(done) {
    request(app)
      .post('/')
      .send({isbn: '1234', count: 10})
      .expect('Content-Type', /json/)
      .expect(200, {isbn: '1234', count: 10}, done);
  });
});
