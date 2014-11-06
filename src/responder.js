function addCommonHeaders(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
}

module.exports.createGet = function(storage){
    var respond = function(req, res, next) {
    storage.get(req.params, function(err, data){
      if (err) {
        res.send(404, err);
        return next();
      }
      addCommonHeaders(res);
      res.send(data);
      return next();
    });
  }
  return respond;
};

module.exports.createAdd = function(storage){
    var respond = function(req, res, next) {
    storage.add(req.body, function(err, data){
      if (err) {
        res.send(404, err);
        return next();
      }
      addCommonHeaders(res);
      res.send();
      return next();
    });
  }
  return respond;
};

module.exports.createUpdate = function(storage){
    var respond = function(req, res, next) {
    storage.update(req.body, function(err, data){
      if (err) {
        res.send(404, err);
        return next();
      }
      addCommonHeaders(res);
      res.send();
      return next();
    });
  }
  return respond;
};

module.exports.createGetList = function(storage){  
  var respond = function(req, res, next) {
    storage.getList(req.query, function(err, data){
      if (err) {
        res.send(404, err);
        return next();
      }
      addCommonHeaders(res);
      res.send(data);
      return next();
    });
  }
  return respond;
};

module.exports.createDel = function(storage){
    var respond = function(req, res, next) {
    storage.del(req.params, function(err){
      if (err) {
        res.send(404, err);
        return next();
      }
      addCommonHeaders(res);
      res.send();
      return next();
    });
  }
  return respond;
};

