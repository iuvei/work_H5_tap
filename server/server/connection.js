var util = require('util');
var utils = require('../utils/utils');
var logger = utils.getLogger('system');
var analyser = utils.getLogger('analyse');
var zlib = require('zlib');
var EventEmitter = require('events').EventEmitter;

var ST_INITED = 0;
var ST_CLOSED = 1;

/**
 * Socket class that wraps socket.io socket to provide unified interface for up level.
 */
var Connection = function(id, socket) {
    EventEmitter.call(this);
    this.id = id;
    this.uuid = null;
    this.binds = {};
    this.establish = new Date();
    this.socket = socket;
    this.remoteAddress = socket.remoteAddress;

    var self = this;

    socket.on('disconnect', this.emit.bind(this, 'disconnect'));

    socket.on('error', function(error){
    	this.emit('error', error);
    }.bind(this));

    socket.on('message', function(msg) {
        self.emit('message', msg);
    });

    this.state = ST_INITED;
};

util.inherits(Connection, EventEmitter);

module.exports = Connection;

Connection.prototype.send = function(msg, event) {
    logger.info("conn:%d send %j %j", this.id, event || "message", msg);

    if (this.state !== ST_INITED) {
        return;
    }

    if (typeof msg !== 'string') {
        msg = JSON.stringify(msg);
    }

    if (event != null) {
        this.socket.emit(event, msg);
    } else {
        this.socket.emit('message', msg);
    }
};

Connection.prototype.disconnect = function() {
    if (this.state === ST_CLOSED) {
        return;
    }

    this.state = ST_CLOSED;
    this.socket.disconnect();
};

Connection.prototype.bind = function(req) {
    this.uuid            = utils.uuid(req);
    this.udid            = req.udid;
    this.channelID       = req.channelID;
    this.serverID        = req.serverID;
};

Connection.prototype.notify = function(event, msg) {
    logger.info("conn:%d send %j %j", this.id, event || "message", msg);
    analyser.info("%s event=%j msg=%j", utils.getAnalyseHeader(this, "$notify$"), event, msg);

    if (this.state !== ST_INITED) {
        return;
    }

    if (typeof msg !== 'string') {
        msg = JSON.stringify(msg);
    }

    this.socket.emit(event, msgBase64Zip);
};
