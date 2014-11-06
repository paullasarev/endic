var _ = require('lodash-node');
var baseStorage = require('../src/base_storage');

function filterProperties(obj, keys){

  var result = _.map(obj, function(val){
    var res = {};
    _.forEach(keys, function(key){
      res[key] = val[key];
    });
    return res;
  });

  return result;
}

function internalStorage() {
  return {
    store: function(data) {
      if (!data.id) {
        data.id = String(this.lastID++);
      }
      this.storedData.push(data);
    },

    getList: function(params, cb) {
      var result = [];
      if (this.haveFilter(params)) {
        result = _.select(this.storedData, this.getFilter(params));
      } else {
        result = this.storedData;
      }

      result = filterProperties(result, this.getPropertyList(params));
      cb(null, result);
    },

    find: function(data){
      return _.find(this.storedData, this.getFilter(data));
    },

    findByID: function(data){
      return _.find(this.storedData, {id:data.id});
    },

    storeByID: function(data, cb) {
      var ind = _.findIndex(this.storedData, {id: data.id});
      if (ind >= 0) {
        this.storedData[ind] = data;
        cb(null);
        return;
      }
      cb({id:data.id, message:'id not found'});
    },

    del: function(params, cb) {
      _.remove(this.storedData, {id: params.id});
      cb(null);
    },

    storedData: [],
    lastID: 10,
  };
}

var lessons = _.extend(baseStorage.createLessons(), internalStorage());

function getWordsByLesson(wordsStoredData, selector) {
  var lesson = _.find(lessons.storedData, selector);
  if (lesson) {
    return _.select(wordsStoredData, function(val) {
      return _.contains(lesson.words, val.id);
    });
  }

  return [];
}

module.exports = {

  users: _.extend(baseStorage.createUsers(), internalStorage()),

  words: _.extend(_.extend(baseStorage.createWords(), internalStorage()), {
    getList: function(params, cb) {
      var result = [];
      if (this.haveFilter(params)) {
        result = _.select(this.storedData, this.getFilter(params));
      } else if (params.group) {
        result = getWordsByLesson(this.storedData, {group:params.group, date:params.date});
      } else if (params.lesson) {
        result = getWordsByLesson(this.storedData, {id:params.lesson});
      } else {
        result = this.storedData;
      }

      result = filterProperties(result, this.getPropertyList(params));
      cb(null, result);
    },
  }),

  groups: _.extend(baseStorage.createGroups(), internalStorage()),

  lessons: lessons,

};

