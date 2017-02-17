var fs = require('fs');
var uuid = require('uuid');
var path = require('path');
var moment = require('moment');
var argv = require('yargs').argv;
var logger = require('./utils/utils').getLogger('system');
var application = require('./application');

var AppID = 10002;
var AppKey = "86a22e8cdf773a4c6329d16ff1587cec";
var AppSecret = "0641801f2e0fa245ca8247618c3967db";
var host = argv.host || process.env.SERVER_HOST || '127.0.0.1';
var port = argv.port || process.env.SERVER_PORT || 12002;
var number = argv.number || process.env.SERVER_NUMBER || 1;
var env = process.env.NODE_ENV || 'localhost';

var app = application;
var options = {
    app: app,
    appID: AppID,
    appKey: AppKey,
    appSecret: AppSecret,

    host: host,
    port: port,
    number: number,
    env: env
};

app.init(options, function() {
    app.start(function() {
        logger.info("server started(listening on %d)...", port);

        for (var name in app.services) {
            if (typeof app.services[name]['start'] == 'function') {
                app.services[name].start();

                logger.info('service <%s> started...', name);
            }
        }
    });
});

process.on('SIGTERM', function() {
    logger.info('receive signal: SIGTERM');
    app.stop();
});

process.on('SIGINT', function() {
    logger.info('receive signal: SIGINT');
    app.stop();
});

process.on('SIGHUP', function() {
    logger.info('receive signal: SIGHUP');
    app.stop();
});

// Uncaught exception handler
process.on('uncaughtException', function(err) {
    logger.error('Caught exception: %j', err.stack);
});

