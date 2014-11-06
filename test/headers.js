describe('service headers', function() {
  it('should response for GET method', function(done) {
    client.get('/words/w1', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal('*', res.headers["access-control-allow-origin"]);
      assert.equal('X-Requested-With', res.headers["access-control-allow-headers"]);
      done();
    });
  });

});
