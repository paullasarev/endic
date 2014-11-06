var _ = require('lodash-node');

function createBaseStorage() {
  return {
    get: function(params, cb) {
      var data = this.findByID(params);
      if (data) {
        cb(null, data);
        return;
      }

      cb({id:params.id, message:'not found'});
    },

    add: function(data, cb){
      if (!this.haveFilter(data)) {
        if (cb) cb({message:'no filter'});
        return;
      }

      var filter = this.getFilter(data);
      if (this.find(filter)) {
        if (cb) cb(_.merge(filter, {message:'already in the base'}));
        return;
      }

      this.store(this.normalize(data));
      if (cb) cb(null);
    },

    update: function(data, cb) {
      if (!data.id) {
        cb({message:'no id'});
        return;
      }

      this.storeByID(this.normalize(data), cb);
    },

    //table-dependant methods
    
    haveFilter: function(data) {
      return false;
    },

    getFilter: function(data) {
      return data;
    },

    normalize: function(data) {
      return data;
    },


    //storage-dependant methods

    store: function(user) {
      //need to implement
    },

    storeByID: function(data, cb) {
      //need to implement
      cb(null);
    },

    getList: function(params, cb) {
      //need to implement
    },

    find: function(data){
      //need to implement
      return null;
    },

    findByID: function(data){
      //need to implement
      return null;
    },

    del: function(params, cb) {
      //need to implement
      cb({message:'err'});
    },
  }  
}

module.exports.createWords = function () {
  return _.extend(createBaseStorage(), {

    haveFilter: function(data) {
      return data.word;
    },

    getFilter: function(data) {
      var filter = {word:data.word};
      filter.meaning = data.meaning ? data.meaning : '';
      return filter;
    },

    normalize: function(data) {
      return {
        id: data.id ? data.id : '',
        word: data.word ? data.word : '',
        meaning: data.meaning ? data.meaning : '',
        partofspeech: data.partofspeech ? data.partofspeech : '',
        definition : data.definition ? data.definition : '',
        transcription : data.transcription ? data.transcription : '',
        translation : data.translation ? data.translation : '',
        examples : data.examples ? data.examples : []
      };
    },

    getPropertyList: function(params) {
      return ["id", "word", "meaning", "partofspeech", "definition", "transcription", "examples", "translation"];
    },
  });
}

module.exports.createUsers = function() {
  return _.extend(createBaseStorage(), {

    haveFilter: function(data) {
      return data.login;
    },

    getFilter: function(data) {
      return {login:data.login}
    },

    normalize: function(data) {
      return  {
        id: data.id ? data.id : '',
        login: data.login ? data.login : '',
        name: data.name ? data.name : data.login,
        password: data.password ? data.password : '',
        role: data.role ? data.role : 'user',
      };
    },

    getPropertyList: function(params) {
      return ["id", "name", "login", "role"];
    },
  });
};

module.exports.createGroups = function() {
  return _.extend(createBaseStorage(), {

    haveFilter: function(data) {
      return data.name;
    },

    getFilter: function(data) {
      var filter = {name:data.name};
      return filter;
    },

    normalize: function(data) {
      return {
        id: data.id ? data.id : '',
        name: data.name ? data.name : data.id,
        users: data.users ? data.users : '',
      };
    },

    getPropertyList: function(params) {
      return ["id", "name"];
    },
  });
};

module.exports.createLessons = function() {
  return _.extend(createBaseStorage(), {

    haveFilter: function(data) {
      return data.date && data.group;
    },

    getFilter: function(data) {
      return {date:data.date, group:data.group};
    },

    normalize: function(data) {
      return {
        id: data.id ? data.id : '',
        date: data.date ? data.date : '',
        group: data.group ? data.group : '',
        words: data.words ? data.words : [],
      };
    },

    getPropertyList: function(params) {
      return ["id", "date", "group"];
    },
  });
};

