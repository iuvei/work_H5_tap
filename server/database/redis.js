var redis = require('redis');
var config = require('../config/config').getRedis();
var client = redis.createClient(config.port, config.addr, config.options);

client.on('error', function(err) {
    console.error("redis error: %j", err);
});

client.on('connect', function() {

});

client.on('ready', function() {

});

client.on('end', function() {

});

// client.on('drain', function() {
//
// });

// client.on('idle', function() {
//
// });

module.exports = client;