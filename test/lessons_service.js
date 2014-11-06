describe('service: lessons', function() {

  it('should response for GET method', function(done) {
    client.get('/lessons/l1', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal('l1', data.id);
      assert.equal('2014-08-01', data.date);
      assert.equal('g1', data.group);
      assert.equal(1, data.words.length);
      assert.equal('w1', data.words[0]);
      done();
    });
  });

  it('should response for HEAD method', function(done) {
    client.head('/lessons/l1', function(err, req, res, data) {
      assert.ifError(err);
      done();
    });
  });

  it('GET should make an error for absent user', function(done) {
    client.get('/lessons/l22', function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('GET should return list', function(done) {
    client.get('/lessons', function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(data.length > 0);
      assert.ifError(data[0].words);
      done();
    });
  });

  it('POST should add a lesson', function(done) {
    client.post('/lessons', {id: 'new', date:'2014-08-02', group:'g3'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/lessons/new', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('new', data.id);
        assert.equal('2014-08-02', data.date);
        assert.equal('g3', data.group);
      });
      done();
    });
  });

  it('POST existant should produce an error', function(done) {
    client.post('/lessons', {id: 'new', date:'2014-08-01', group:'g1'} , function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('PUT should modify', function(done) {
    client.put('/lessons', {id:'l1', date:'2014-08-01', group:'g4', words:['w1']} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/lessons/l1', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('g4', data.group);
        done();
      });
    });
  });

  it('GET by filter should return list', function(done) {
    client.get('/lessons?date=2014-08-01&group=g4', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      assert.equal('l1', data[0].id);
      done();
    });
  });

  it('DELETE should delete', function(done) {
    client.post('/lessons', {date:'2014-08-02', group:'g33'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/lessons?date=2014-08-02&group=g33', function(err, req, res, data) {
        assert.ifError(err);
        id = data.id;
        client.del('/lessons/' + id, function(err, req, res) {
          assert.ifError(err);
          client.get('/lessons/' + id, function(err, req, res, data) {
            assert.ok(err);
            done();
          });
        });
      });
    });
  });

});