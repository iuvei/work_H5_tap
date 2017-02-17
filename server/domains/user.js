var moment = require('moment');
var Game = require('../../game/');
var utils = require('../utils/utils');
var logger = utils.getLogger('system');
var app = require('../application');

var User = module.exports = function(opts) {
    opts = opts || {};

    this.uuid           = opts.uuid;
    this.conn           = opts.conn;
    this.interval       = 1000;
    this.timerId        = null;

    this.battle         = null;
    this.player         = null;
};

User.prototype.getPlayer = function() {
    return this.player;
};

User.prototype.setPlayer = function(player) {
    this.player = player;
};

User.prototype.start = function() {
    if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
    }

    this.startTime = moment();
    this.timerId = setTimeout(this.onTimer.bind(this), this.interval);
};

User.prototype.stop = function(callback) {
    var self = this;
    var player = this.getPlayer();

    if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
    }

    if (player != null) {
        //离线前的处理
        player.leaveDispose();

        var dataService = app.services.data;
        dataService.savePlayer(self.uuid, function(done) {
            console.log("save player " + player.name + " " + done)
        });
    }

    if (typeof callback === "function") {
        callback();
    }
};

User.prototype.onTimer = function() {
    this.start();
};
