var es = require('event-stream'),
  redis = require('redis'),
  client = redis.createClient();

module.exports = function() {
  return es.map(function(data, cb){
    var key = 'events:' + data.id.toString();
    console.log(key);
    console.log(data);
    client.hmset(key, data, function(err, res){
      console.log(err);
      cb(null, data);
    });
  });
}