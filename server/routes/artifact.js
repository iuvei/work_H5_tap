var async = require('async');
var moment = require('moment');
var request = require('request');
var Code = require('../../game').Code;
var redis = require('../database/redis');
var utils = require('../utils/utils');
var app = require('../application');
var analyser = utils.getLogger('analyse');

module.exports = {
    buy: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.buyArtifactHandle();
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$artifact.buy$"));

        res.send(handleResult);
    },

    sale: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var key = req.query.key || "";
        var handleResult = player.saleArtifactHandle({key: key});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$artifact.sale$"));

        res.send(handleResult);
    },

    upgrade: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var key = req.query.key || "";
        var handleResult = player.upgradeArtifactHandle({key: key});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$artifact.upgrade$"));

        res.send(handleResult);
    }
};