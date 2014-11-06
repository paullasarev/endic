describe('service: groups', function() {

  it('should response for GET method', function(done) {
    client.get('/groups/g1', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal('g1', data.id);
      assert.equal('Group 1', data.name);
      assert.equal(1, data.users.length);
      assert.equal('u1', data.users[0]);
      done();
    });
  });

  it('should response for HEAD method', function(done) {
    client.head('/groups/g1', function(err, req, res, data) {
      assert.ifError(err);
      done();
    });
  });

  it('GET should make an error for absent user', function(done) {
    client.get('/groups/wrong', function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('GET should return list', function(done) {
    client.get('/groups', function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(data.length > 0);
      assert.ifError(data[0].users);
      done();
    });
  });


  it('POST should add a group', function(done) {
    client.post('/groups', {id: 'g2', name:'new'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/groups/g2', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('g2', data.id);
        assert.equal('new', data.name);
      });
      done();
    });
  });

  it('POST existant should produce an error', function(done) {
    client.post('/groups', {id: 'g1'} , function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('PUT should modify', function(done) {
    client.put('/groups', {id:'g2', name: 'new22'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/groups/g2', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('new22', data.name);
        done();
      });
    });
  });

  it('GET by filter should return list', function(done) {
    client.get('/groups?name=Group%201', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      assert.equal('g1', data[0].id);
      done();
    });
  });


  it('DELETE should delete', function(done) {
    client.post('/groups', {name: 'new222'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/groups?name=new222', function(err, req, res, data) {
        assert.ifError(err);
        id = data.id;
        client.del('/groups/' + id, function(err, req, res) {
          assert.ifError(err);
          client.get('/groups/' + id, function(err, req, res, data) {
            assert.ok(err);
            done();
          });
        });
      });
    });
  });

});