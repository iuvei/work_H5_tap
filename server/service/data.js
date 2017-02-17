
var async = require('async');
var moment = require('moment');
var Code = require('../../game').Code;
var redis = require('../database/redis');
var mysql = require('../database/mysql');
var utils = require('../utils/utils');
var Games = require('../../game/');
var Player = Games.Player;
var env = process.env.NODE_ENV || 'development';

var Service = module.exports = function(app) {
    this.app = app;
    this.players = {};
};

Service.prototype.loadPlayer = function(uuid, callback) {
    var self = this;

    var sql = "SELECT * FROM players WHERE uuid = ?";
    var val = [uuid];

    mysql.query(sql, val, function(err, resultset) {
        if (err != null) {
            return callback(null);
        }

        if (resultset.length == 0) {
            return callback(null);
        }

        var row = resultset[0];
        var opts = JSON.parse(row.data);

        var player = new Player(opts);
        if (player.id <= 0) {
            player.id  = row.id;
        }
        self.addPlayer(player);
        callback(player);
    });
};

Service.prototype.savePlayer = function(uuid, callback) {
    var player = this.players[uuid];
    if (player == null) {
        return callback(false);
    }

    var sql = "UPDATE players SET data=? WHERE uuid=?";
    var val = [player.toString(), uuid];

    mysql.query(sql, val, function(err, resultset) {
        if (err != null) {
            return callback(false);
        }

        callback(true);
    });
};

Service.prototype.createPlayer = function(opts, callback) {
    var self = this;
    var player = new Player(opts);

    var sql = "INSERT INTO players(" +
        "uuid, udid, channelID, serverID, " +
        "name, createTime, lastLogin, data) " +
        "VALUES(" +
        "?, ?, ?, ?, " +
        "?,  now(), now(), ?)";
    var val = [
        opts.uuid, opts.udid, opts.channelID, opts.serverID,
        opts.name, player.toString()
    ];

    mysql.query(sql, val, function(err, resultset) {
        if (err != null) {
            return callback(null);
        }

        player.id  = resultset.insertId;
        self.addPlayer(player);
        callback(player);
    });
};

Service.prototype.getPlayer = function(uuid, callback) {
    var player = this.players[uuid];
    if (player != null) {
        return callback(this.players[uuid]);
    }

    this.loadPlayer(uuid, callback);
};

Service.prototype.addPlayer = function(player) {
    this.players[player.uuid] = player;
};
