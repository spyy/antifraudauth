var should = require('should');
var request = require('supertest');
var server = require('../../../app');

var params = {
  domain: 'payapi.io',
  userId: 'diiba',
  ipAddress: '123.123.123.123'
}

describe('controllers', function() {
  describe('get authentication challenge', function() {
    describe('GET /v1/authenticate', function() {
      it('should return a default string', function(done) {
        request(server)
          .get('/v1/authenticate')
          .query(params)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            done();
          });
      });

      it('should require a domain parameter', function(done) {
        delete params['domain']
        request(server)
          .get('/v1/authenticate')
          .query(params)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .end(function(err, res) {
            res.body.message.should.eql('Request validation failed: Parameter (domain) is required');
            done();
          });
      });

    });

  });

});
