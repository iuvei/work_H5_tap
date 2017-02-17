var async = require('async');
var moment = require('moment');
var request = require('request');
var Code = require('../../game').Code;
var redis = require('../database/redis');
var utils = require('../utils/utils');
var app = require('../application');
var signUtils = require('../utils/SignUtils');
var analyser = utils.getLogger('analyse');

module.exports = {
    auth: function(req, res) {
        var response = {};

        var appID = req.query.appID;
        var channelID = req.query.channelID;
        var serverID = req.query.serverID;
        var uuid = req.query.uuid;
        var udid = req.query.udid;
        var token = req.query.token;

        if (channelID == null) {
            response.err = Code.REQUEST.INVALID_PLATFORM;
            response.msg = 'invalid platform';
            res.send(response);
            return;
        }

        if (serverID != app.id) {
            response.err = Code.REQUEST.INVALID_SERVER;
            response.msg = 'invalid server';
            res.send(response);
            return;
        }

        if (appID != app.appID) {
            response.err = Code.REQUEST.INVALID_SERVER;
            response.msg = 'invalid server';
            res.send(response);
            return;
        }

        var uri = app.accountService;
        var api = "/api/verifyAccount";
        var params = {
            appID: app.appID,
            channelID: channelID,
            uuid: uuid,
            udid: udid,
            token: token,
            timestamp: moment().format('X')
        };
        params['signature'] = signUtils.serverSignature(app.appSecret, params);

        var url = utils.resolveURL(uri + api, params);
        var options = {
            url: url
        };

        request(options, function(error, rest, body) {
            if (error != null) {
                response.err = Code.HTTP.REQUEST_ERROR;
                response.msg = JSON.stringify(error);
                res.send(response);

                return;
            }

            if (rest.statusCode != 200) {
                response.err = Code.HTTP.STATUS_ERROR;
                response.msg = JSON.stringify(response);
                res.send(response);
                return;
            }

            var data = null;

            try {
                data = JSON.parse(body);
            } catch (e) {
                response.err = Code.HTTP.BODY_ERROR;
                response.msg = JSON.stringify(e);
                res.send(response);
                return;
            }
            analyser.info(data);
            if (data.code != Code.OK) {
                response.err = Code.REQUEST.TOKEN_ERROR;
                response.msg = "token error";
                res.send(response);
                return;
            }

            req.conn.bind(req.query);

            app.services.user.kick(req.conn.uuid, function(success) {
                if (success == false) {
                    response.err = Code.MySQL.DB_ERROR;
                    res.send(response);
                    return;
                }

                var user = app.services.user.add(req.conn);

                app.services.data.getPlayer(req.conn.uuid, function(player) {
                    if (player != null) {
                        response.player = player.clone();

                        user.setPlayer(player);
                    }

                    res.send(response);
                })
            });
        });
    },

    create: function(req, res) {
        var response = {};

        var opts = {
            name:      req.query.name,
            uuid:      req.conn.uuid,
            udid:      req.conn.udid,
            channelID: req.conn.channelID,
            serverID:  req.conn.serverID
        };

        var user = req.user;

        app.services.data.createPlayer(opts, function(player) {
            if (player == null) {
                response.err = Code.MySQL.DB_ERROR;
                res.send(response);
                return;
            }

            user.setPlayer(player);

            response.player = player.clone();
            res.send(response);
        });
    },

    enter: function(req, res) {
        var user = req.user;
        var player = user.getPlayer();

        if (player == null) {
            res.send({
                err: Code.MySQL.DB_ERROR
            });
            return;
        }

        analyser.info("%s", utils.getAnalyseHeader(req.conn, "$start$"));

        var handleResult = player.enterHandle();
        player.syncPlayer(handleResult);
        user.start();

        //毫秒 小写x
        var millisecond = Number(moment().format("x"));

        res.send({millisecond: millisecond, player: handleResult});
    }
};