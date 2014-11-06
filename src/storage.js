
module.exports = {
  words: {
    get: function(word, cb) {
      cb(null, {word: word});
    },
    getList: function(params, cb) {
      cb(null, []);
    }, 
    add: function(data, cb){
      cb(null);
    }
  },
  users : {
    get: function(user, cb) {
      cb(null, {user: user});
    },
  }
};

