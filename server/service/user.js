var async = require('async');
var User = require('../domains/user');
var Games = require('../../game/');
var logger = require('../utils/utils').getLogger('system');

var Service = module.exports = function(app) {
    this.app = app;
    this.users = {};
};

Service.prototype.get = function(uuid) {
    return this.users[uuid];
};

Service.prototype.add = function(conn) {
    var user = new User({
        uuid: conn.uuid,
        conn: conn
    });

    this.users[conn.uuid] = user;

    conn.on('error', this.remove.bind(this, conn.uuid));
    conn.on('disconnect', this.remove.bind(this, conn.uuid));

    return user;
};

Service.prototype.remove = function(uuid) {
    var user = this.get(uuid);
    if (user == null) {
        return;
    }

    user.stop();
    delete this.users[uuid];
};

Service.prototype.kick = function(uuid, callback) {
    var user = this.get(uuid);
    if (user == null) {
        callback();
        return;
    }

    var player = user.getPlayer();
    if (player == null) {
        user.conn.disconnect();
        callback();
    } else {
        this.app.services.data.savePlayer(uuid, function(success) {
            user.conn.disconnect();
            callback(success);
        });
    }
};

Service.prototype.stop = function(cb) {
    var self = this;
    var uuids = Object.keys(this.users);
    var iterator = function(uuid, callback) {
        var user = self.users[uuid];
        user.stop(function() {
            callback(null);
        });
    };

    logger.info('stopping user service...');
    async.eachSeries(uuids, iterator, function(err) {
        if (err != null) {
            cb(err);
            return;
        }

        if (cb != null) {
            cb(null);
        }
    });
};
