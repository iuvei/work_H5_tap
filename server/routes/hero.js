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
        var id = req.query.id || 0;

        var handleResult = player.heroUpgradeHandle({level: level, id: id});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$hero.upgrade$"));

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

        var id = req.query.id || 0;

        var handleResult = player.heroEvolutionHandle({id: id});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$hero.evolution$"));

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

        var skillId = req.query.skillId || 0;
        var id = req.query.id || 0;

        var handleResult = player.heroSkillUpgradeHandle({id: id, skillId: skillId});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$hero.skill.upgrade$"));

        res.send(handleResult);
    },

    kill: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var handleResult = player.heroDeadHandle();
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$hero.kill$"));

        res.send(handleResult);
    },

    revived: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var id = req.query.id || 0;

        var handleResult = player.heroReviveHandle({id: id});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$hero.revived$"));

        res.send(handleResult);
    }
};