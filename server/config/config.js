var env = process.env.NODE_ENV || 'development';
var redis = require('./redis.json');
var mysql = require('./mysql.json');
var stats = require('./stats.json');
var log4js = require('./log4js.json');
var service = require('./service.json');
var exports = module.exports;

exports.getRedis = function() {
    return redis[env];
};

exports.getMysql = function() {
    return mysql[env];
};

exports.getStats = function() {
    return stats[env];
};

exports.getLog4js = function() {
    return log4js[env];
};

exports.getService = function() {
    return service[env];
};
