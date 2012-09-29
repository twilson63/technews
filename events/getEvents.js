var es = require('event-stream'),
  redis = require('redis'),
  client = redis.createClient();

module.exports = function() {
  return es.map(function(data, cb){
    client.keys('events', function(err, keys){
      var events = [];
      var count = 0;
      var insertEvent = function (err, obj) {
        events.push(obj);
      }
      keys.forEach(function(key){
        client.hgetall(key, insertEvent);
        count += 1;
        if (count === keys.length) {
          cb(null, events);
        }
      });
    });
  });
}