module.exports = function(testcase) {
  var storage = require('./fake_storage');

  var words = require('./data/' + testcase + '/words.js');
  for (var i = 0; i < words.length; i++) {
    storage.words.add(words[i], null, true);
  }

  var users = require('./data/' + testcase + '/users.js');
  for (var i = 0; i < users.length; i++) {
    storage.users.add(users[i]);
  }

  var groups = require('./data/' + testcase + '/groups.js');
  for (var i = 0; i < groups.length; i++) {
    storage.groups.add(groups[i]);
  }

  var lessons = require('./data/' + testcase + '/lessons.js');
  for (var i = 0; i < lessons.length; i++) {
    storage.lessons.add(lessons[i]);
  }

  return storage;
}