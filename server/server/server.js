
var fs = require('fs');
var path = require('path');
var Connector = require('./connector');
var utils = require('../utils/utils');
var Code = require('../../game').Code;
var analyser = utils.getLogger('analyse');
var logger = utils.getLogger('system');

var Server = function(opts) {
    opts = opts || {};

    this.app = opts.app;
    this.routers = {};
    this.connector = new Connector(this, opts.port, opts.host);
};

module.exports = Server;

Server.prototype.init = function() {
    var self = this;
    var dir = path.resolve(__dirname, '../routes/');

    fs.readdirSync(dir).forEach(function(file) {
        if (!/\.js$/.test(file)) {
            return;
        }

        var name = path.basename(file, '.js');
        var router = require('../routes/' + file);

        self.routers[name] = {};
        for (var key in router) {
            if (typeof router[key] == 'function') {
                self.routers[name][key] = router[key];
            }
        }
    });
};

Server.prototype.start = function(cb) {
    console.log("server started...");
    this.connector.start(cb);
};

Server.prototype.stop = function(cb) {
    this.connector.stop(cb);
};

Server.prototype.handle = function(conn, msg, cb) {
    var userService = this.app.services.user;
    var array = msg.router.split(".");
    var name = array[0];
    var func = array[1];
    var router = name && this.routers[name] && func && this.routers[name][func];

    if (router == null) {
        return;
    }

    var req = {};
    var res = {};

    req.conn = conn;
    req.user = userService.get(conn.uuid) || {};
    req.router = msg.router;
    req.query = msg.data || {};

    res.req = req;
    res.send = function(obj) {
        if (typeof cb === 'function') {
            cb(obj);
        }

        analyser.info("%s router=%s req=%j res=%j", utils.getAnalyseHeader(conn, "$handle$"), req.router, req.query, obj);
    };

    try {
        router(req, res);
    } catch (e) {
        res.send({
            err: Code.REQUEST.INTERNAL_ERROR,
            msg: "internal server error"
        });

        logger.error("conn:%d router=%s req=%j exception=%j", conn.id, msg.router, req.query, e.stack);
    }
};
