
describe('service: words', function() {
  it('should return list of words', function(done) {
    client.get('/words', function(err, req, res, data) {
      assert.ifError(err);
      assert.ok(data.length > 0);
      assert.equal('hello', data[0].word);
      assert.equal('used when meeting or greeting someone', data[0].definition);
      assert.ok(data[0].transcription);
      assert.ok(data[0].examples);
      assert.ok(data[0].translation);
      done();
    });
    
  }); 

  it('should response for GET method', function(done) {
    client.get('/words/w1', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal('w1', data.id);
      assert.equal('hello', data.word);
      assert.equal('', data.meaning);
      assert.equal('exclamation', data.partofspeech);
      assert.equal('used when meeting or greeting someone', data.definition);
      assert.equal('/helˈəʊ/', data.transcription);
      assert.equal("Hello, Paul. I haven't seen you for ages.", data.examples[0]);
      assert.equal('Привет', data.translation);      
      done();
    });
  });

  it('should response for HEAD method', function(done) {
    client.head('/words/w1', function(err, req, res, data) {
      assert.ifError(err);
      done();
    });
  });

  it('GET should make an error for absent word', function(done) {
    client.get('/words/wrongword', function(err, req, res, data) {
      assert.ok(err);
      done();
    });
  });

  it('POST should add a word', function(done) {
    client.post('/words', {word: 'new2'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/words?word=new2', function(err, req, res, data) {
        assert.ifError(err);
       assert.equal(1, data.length);
        assert.equal('new2', data[0].word);
      });
      done();
    });

  });

  it('POST existant word should produce an error', function(done) {
    
    client.post('/words', {word:'hello'} , function(err, req, res, data) {
      assert.ok(err);
      done();
    });

  });

  it('GET by word should return list', function(done) {
    client.get('/words?word=hello&meaning=', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      done();
    });
  });

  it('GET by word and meaning should return list', function(done) {
    client.get('/words?word=make&meaning=produce', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      done();
    });
  });

  it('PUT should modify a word', function(done) {
    client.put('/words', {id:'w1', word: 'new'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/words/w1', function(err, req, res, data) {
        assert.ifError(err);
        assert.equal('new', data.word);
        done();
      });
    });
  });

  it('DELETE should delete a word', function(done) {
    client.post('/words', {word: 'new22'} , function(err, req, res, data) {
      assert.ifError(err);
      client.get('/words?word=new22', function(err, req, res, data) {
        assert.ifError(err);
        id = data.id;
        client.del('/words/' + id, function(err, req, res) {
          assert.ifError(err);
          client.get('/words/' + id, function(err, req, res, data) {
            assert.ok(err);
            done();
          });
        });
      });
    });
  });

  it('GET by group and date return list', function(done) {
    client.get('/words?group=g4&date=2014-08-01', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      assert.equal('w1', data[0].id);
      done();
    });
  });

  it('GET by lesson should return list', function(done) {
    client.get('/words?lesson=l1', function(err, req, res, data) {
      assert.ifError(err);
      assert.equal(1, data.length);
      assert.equal('w1', data[0].id);
      done();
    });
  });

});
