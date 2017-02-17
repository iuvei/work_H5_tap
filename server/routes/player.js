var async = require('async');
var moment = require('moment');
var request = require('request');
var Code = require('../../game').Code;
var redis = require('../database/redis');
var utils = require('../utils/utils');
var app = require('../application');
var analyser = utils.getLogger('analyse');

module.exports = {
    upgrade: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var level = req.query.level || 0;
        var free = req.query.free || false;

        var handleResult = player.upgradeHandle({level: level, free: free});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.upgrade$"));

        res.send(handleResult);
    },

    skillUpgrade: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var name = req.query.name || "";

        var handleResult = player.skillUpgradeHandle({name: name});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.skill.upgrade$"));

        res.send(handleResult);
    },

    skillCast: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var name = req.query.name || "";

        var handleResult = player.skillCastHandle({name: name});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.skill.cast$"));

        res.send(handleResult);
    },

    getOfflineGold: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.offlineGoldHandle();
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.get.offline.gold$"));

        res.send(handleResult);
    },

    midas: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.midasHandle();
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.midas$"));

        res.send(handleResult);
    },

    pickup: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var uuid = req.query.uuid || "";

        var handleResult = player.getCoinHandle({uuid: uuid});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.get.coin$"));

        res.send(handleResult);
    },

    evolve: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.evolutionHandle();
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.evolution$"));

        res.send(handleResult);
    },

    gm: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.gmHandle(req.query);
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$player.manager$"));

        res.send(handleResult);
    }
};