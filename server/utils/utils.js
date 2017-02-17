var fs = require('fs');
var util = require('util');
var log4js = require("log4js");
var moment = require('moment');
var CryptoJS = require('crypto-js');
var log4jsConfig = require('../config/config').getLog4js();

log4js.configure(log4jsConfig);
var Utils = module.exports = {};

Utils.uuid = function(params) {
    var udid = params.udid;
    var channelID = params.channelID;
    var serverID = params.serverID || 1;

    var md5 = CryptoJS.MD5(udid + serverID + channelID).toString();
    var objectId = "";

    objectId += md5.substr(0, 8) + '-';
    objectId += md5.substr(8, 4) + '-';
    objectId += md5.substr(12, 4) + '-';
    objectId += md5.substr(16, 4) + '-';
    objectId += md5.substr(20, 12);

    return objectId;
};

Utils.serverSignature = function(params) {
    var keys = [];
    var Secret = "920uC3vADK9A2vxgjFQ5PIyQtoltoEGlCam2TH7J81qLuMnWbj3PIzT4IU9tLFa1";

    for (var key in params) {
        if (key == 'signature') {
            continue;
        }

        keys.push(key);
    }
    keys.sort();

    var url = '';
    for (var i in keys) {
        var key = keys[i];
        url += key + '=' + encodeURIComponent(params[key]);
        if (i < keys.length - 1) {
            url += '&';
        }
    }

    url = CryptoJS.HmacSHA1(url, Secret + 'whalejoy20140508');

    return CryptoJS.enc.Base64.stringify(url);
};

Utils.resolveURL = function(uri, params) {
    var url = uri.length ? uri + '?' : "";

    for (var key in params) {
        url += key + '=' + encodeURIComponent(params[key]) + '&';
    }

    url = url.substring(0, url.length-1);

    return url;
};

//logger.trace logger.debug logger.info logger.warn logger.error
Utils.getLogger = function(name) {
    return log4js.getLogger(name);
};

Utils.getAnalyseHeader = function(conn, keyword) {
    var id = conn.id;
    var uuid = conn.uuid || "";

    return "conn:" + id + " uuid=" + uuid  + " " + keyword;
};