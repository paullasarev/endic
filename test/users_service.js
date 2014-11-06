describe('service: users', function() {

  it('should response for GET method', function(done) {
    client.get('/users/u1', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal('u1', data.id);
      assert.equal('Admin', data.name);
      assert.equal('admin', data.login);
      assert.equal('pass', data.password);
      assert.equal('teacher', data.role);
      done();
    });
  });

  it('should response for HEAD method', function(done) {
    client.head('/users/u1', function(err, req, res, data) {
      assert.ifError(err);
      done();
    });
  });

  it('GET should make an error for absent user', function(done) {
    client.get('/users/wronguser', function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('GET should return list', function(done) {
    client.get('/users', function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(data.length > 0);
      assert.ifError(data[0].password);
      assert.ok(data[0].role);
      done();
    });
  });

  it('POST should add a user', function(done) {
    client.post('/users', {id:'u2',login: 'new'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/users/u2', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('u2', data.id);
        assert.equal('new', data.login);
        assert.equal('new', data.name);
      });
      done();
    });
  });

  it('POST existant should produce an error', function(done) {
    client.post('/users', {login: 'admin'} , function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('PUT should modify', function(done) {
    client.put('/users', {id:'u2', login: 'new22'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/users/u2', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('new22', data.login);
        done();
      });
    });
  });

  it('GET by login should return list', function(done) {
    client.get('/users?login=admin', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      assert.equal('admin', data[0].login);
      done();
    });
  });


  it('DELETE should delete', function(done) {
    client.post('/users', {login: 'new222'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/users?login=new222', function(err, req, res, data) {
        assert.ifError(err);
        id = data.id;
        client.del('/users/' + id, function(err, req, res) {
          assert.ifError(err);
          client.get('/users/' + id, function(err, req, res, data) {
            assert.ok(err);
            done();
          });
        });
      });
    });
  });


});