module.exports.Start = function(config) {
 
    var restify = require('restify');
    var server = restify.createServer();
    server.use(restify.bodyParser());
    server.use(restify.queryParser());

    restify.CORS.ALLOW_HEADERS.push('authorization');

    var responder = require('./responder');

// words    
    var wordsStorage = config.storage.words;
    server.get('/words/:id', responder.createGet(wordsStorage));
    server.head('/words/:id', responder.createGet(wordsStorage));
    server.get('/words', responder.createGetList(wordsStorage));
    server.post('/words', responder.createAdd(wordsStorage));
    server.put('/words', responder.createUpdate(wordsStorage));
    server.del('/words/:id', responder.createDel(wordsStorage));

// users
    var usersStorage = config.storage.users;
    server.get('/users/:id', responder.createGet(usersStorage));
    server.head('/users/:id', responder.createGet(usersStorage));
    server.get('/users', responder.createGetList(usersStorage));
    server.post('/users', responder.createAdd(usersStorage));
    server.put('/users', responder.createUpdate(usersStorage));
    server.del('/users/:id', responder.createDel(usersStorage));

// groups
    var groupsStorage = config.storage.groups;
    server.get('/groups/:id', responder.createGet(groupsStorage));
    server.head('/groups/:id', responder.createGet(groupsStorage));
    server.get('/groups', responder.createGetList(groupsStorage));
    server.post('/groups', responder.createAdd(groupsStorage));
    server.put('/groups', responder.createUpdate(groupsStorage));
    server.del('/groups/:id', responder.createDel(groupsStorage));

// lessons
    var lessonsStorage = config.storage.lessons;
    server.get('/lessons/:id', responder.createGet(lessonsStorage));
    server.head('/lessons/:id', responder.createGet(lessonsStorage));
    server.get('/lessons', responder.createGetList(lessonsStorage));
    server.post('/lessons', responder.createAdd(lessonsStorage));
    server.put('/lessons', responder.createUpdate(lessonsStorage));
    server.del('/lessons/:id', responder.createDel(lessonsStorage));

// server
    server.listen(config.port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
 
};