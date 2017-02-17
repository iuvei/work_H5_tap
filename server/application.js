/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var EventEmitter = require('events').EventEmitter;
var Server = require('./server/server');
var logger = require('./utils/utils').getLogger('system');
var MasterDB = require('./models/masterDB');

/**
 * Application prototype.
 *
 * @module
 */
var Application = module.exports = {};

/**
 * Application states
 */
var STATE_INITED  = 1;  // app has inited
var STATE_START = 2;  // app start
var STATE_STARTED = 3;  // app has started
var STATE_STOPED  = 4;  // app has stoped

/**
 * Initialize the server.
 *
 *   - setup default configuration
 */
Application.init = function(opts, cb) {
    var self = this;
    opts = opts || {};

    this.settings = {};                 // collection keep set/get
    this.event = new EventEmitter();    // event object to sub/pub events

    this.set('env', opts.env, true);

    this.id = opts.number;
    this.appID = opts.appID;
    this.appKey = opts.appKey;
    this.appSecret = opts.appSecret;

    this.services = {};
    this.loadServices();

    this.server = new Server(opts);
    this.server.init();

    this.accountService = "";

    this.state = STATE_INITED;

    MasterDB.models.server.findOne({
        where: { appID: opts.appID, serverID: opts.number, environment: opts.env }
    }).then(function(server) {
        if (server == null) {
            logger.info("cannot find server config @masterDB");
            process.exit(-1);
        }

        self.accountService = server.service;

        logger.info('application inited');
        process.nextTick(cb);
    }).catch(function(e) {
        logger.error(e);
        process.exit(-1);
    });
};

/**
 * Start application.
 *
 * @param  {Function} cb callback function
 * @memberOf Application
 */
Application.start = function(cb) {
    var self = this;
    this.startTime = Date.now();
    if (this.state > STATE_INITED) {
        return;
    }

    console.log("application started...");

    self.server.start(cb);
};

Application.stop = function() {
    var self = this;
    var names = Object.keys(this.services);

    var iterator = function(name, callback) {
        var service = self.services[name];
        if (typeof service['stop'] === 'function') {
            service.stop(function() {
                callback(null);
            });
        } else {
            callback(null);
        }
    };

    logger.info('stopping application...');
    async.eachSeries(names, iterator, function(err) {
        logger.info('server stopped...');
        process.exit(0);
    });
};

/**
 * Assign `setting` to `val`, or return `setting`'s value.
 *
 * Example:
 *
 *  app.set('key1', 'value1');
 *  app.get('key1');  // 'value1'
 *  app.key1;         // undefined
 *
 *  app.set('key2', 'value2', true);
 *  app.get('key2');  // 'value2'
 *  app.key2;         // 'value2'
 *
 * @param {String} setting the setting of application
 * @param {String} val the setting's value
 * @param {Boolean} attach whether attach the settings to application
 * @return {Server|Mixed} for chaining, or the setting value
 * @memberOf Application
 */
Application.set = function (setting, val, attach) {
    if (arguments.length === 1) {
        return this.settings[setting];
    }
    this.settings[setting] = val;
    if(attach) {
        this[setting] = val;
    }
    return this;
};

/**
 * Get property from setting
 *
 * @param {String} setting application setting
 * @return {String} val
 * @memberOf Application
 */
Application.get = function (setting) {
    return this.settings[setting];
};

/**
 * Check if `setting` is enabled.
 *
 * @param {String} setting application setting
 * @return {Boolean}
 * @memberOf Application
 */
Application.enabled = function (setting) {
    return !!this.get(setting);
};

/**
 * Check if `setting` is disabled.
 *
 * @param {String} setting application setting
 * @return {Boolean}
 * @memberOf Application
 */
Application.disabled = function (setting) {
    return !this.get(setting);
};

/**
 * Enable `setting`.
 *
 * @param {String} setting application setting
 * @return {app} for chaining
 * @memberOf Application
 */
Application.enable = function (setting) {
    return this.set(setting, true);
};

/**
 * Disable `setting`.
 *
 * @param {String} setting application setting
 * @return {app} for chaining
 * @memberOf Application
 */
Application.disable = function (setting) {
    return this.set(setting, false);
};

Application.loadServices = function() {
    var self = this;

    var dir = path.resolve(__dirname, './service/');
    fs.readdirSync(dir).forEach(function(file) {
        if (!/\.js$/.test(file)) {
            return;
        }

        var name = path.basename(file, '.js');
        var Service = require('./service/' + file);

        self.services[name] = new Service(self);
    });
};

Application.getService = function(name) {
    return this.services[name];
};