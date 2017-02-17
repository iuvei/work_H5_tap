var async = require('async');
var moment = require('moment');
var request = require('request');
var Code = require('../../game').Code;
var redis = require('../database/redis');
var utils = require('../utils/utils');
var app = require('../application');
var analyser = utils.getLogger('analyse');

module.exports = {
    make: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.makeFairyHandle();
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$fairy.make$"));

        res.send(handleResult);
    },

    collect: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var uuid = req.query.uuid || "";
        var handleResult = player.collectFairyHandle({uuid: uuid});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$fairy.collect$"));

        res.send(handleResult);
    },

    remove: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var uuid = req.query.uuid || "";
        var handleResult = player.removeFairyHandle({uuid: uuid});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$fairy.remove$"));

        res.send(handleResult);
    }
};