var async = require('async');
var moment = require('moment');
var request = require('request');
var Code = require('../../game').Code;
var redis = require('../database/redis');
var utils = require('../utils/utils');
var app = require('../application');
var analyser = utils.getLogger('analyse');

module.exports = {
    cast: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        var key = req.query.key || "";

        var handleResult = player.itemCastHandle({key: key});
        if (handleResult.err == null) {
            player.syncPlayer(handleResult);
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$item.cast$"));

        res.send(handleResult);
    }
};