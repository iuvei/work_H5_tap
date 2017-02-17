var util = require('util');
var EventEmitter = require('events').EventEmitter;
var sio = require('socket.io');
var Connection = require('./connection');
var utils = require('../utils/utils');
var logger = utils.getLogger('system');

var Connector = function(server, port, host, opts) {
    EventEmitter.call(this);
    this.server = server;
    this.port = port;
    this.host = host;
    this.opts = opts;
    this.curId = 0;
    this.connections = {};
};

util.inherits(Connector, EventEmitter);

module.exports = Connector;

Connector.prototype.start = function(cb) {
    console.log("connector started...");

    if (!!this.opts) {
        this.wsocket = new sio(this.opts);
    } else {
        this.wsocket = new sio({
            transports: [
                'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'flashsocket'
            ]
        });
    }

    this.wsocket.sockets.on('connection', this.onConnectionNew.bind(this));
    this.wsocket.listen(this.port);

    process.nextTick(cb);
};

/**
 * Stop connector
 */
Connector.prototype.stop = function(cb) {
    this.wsocket.server.close();
    process.nextTick(cb);
};

Connector.prototype.onConnectionNew = function(socket) {
    var conn = new Connection(++this.curId, socket);

    this.connections[this.curId] = conn;

    conn.on('message', this.onConnectionMessage.bind(this, conn));
    conn.on('error', this.onConnectionError.bind(this, conn));
    conn.on('disconnect', this.onConnectionDisconnect.bind(this, conn));

    console.log(conn);
    logger.info("conn:%d created...", conn.id);
};

Connector.prototype.onConnectionMessage = function(conn, msg) {
    logger.info("conn:%d received message %j", conn.id, msg);

    var dmsg = (typeof msg === "object") ? msg : JSON.parse(msg);

    // invalid request type
    if (dmsg.router == null) {
        return;
    }

    if (dmsg.id == null) {
        return;
    }

    var response = {
        id: dmsg.id,
        router: dmsg.router,
        code: 200,
        data: {}
    };


    this.server.handle(conn, dmsg, function(res) {
        if (res.err != null) {
            response.code = 500;
            response.err = res.err;
            response.msg = res.msg;
        } else if (res.failed == true) {
            response.code = 500;
        } else {
            response.code = 200;
            response.data = res;
        }

        conn.send(response);
    });
};

Connector.prototype.onConnectionError = function(conn, error) {
    logger.info("conn:%d error %j", conn.id, error.stack);

    delete this.connections[conn.id];
};

Connector.prototype.onConnectionDisconnect = function(conn) {
    logger.info("conn:%d disconnect", conn.id);

    delete this.connections[conn.id];
};

Connector.prototype.notifyConnection = function(id, event, msg) {
    var conn = this.connections[id];
    if (conn == null) {
        return;
    }

    conn.send(msg, event);
};
