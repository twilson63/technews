var es = require('event-stream'),
  redis = require('redis'),
  client = redis.createClient();

module.exports = function() {
  return es.map(function(data, cb){
    client.incr('events', function(err, count){
      data.id = count.toString();
      data.createdAt = (new Date()).toString();
      cb(null, data);
    });
  });
}