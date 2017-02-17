
var NetManager = (function(_super) {
    var CODE = Game.Code;
    function NetManager() {
        NetManager.super(this);

        // 主服务器地址
        this.masterService     = App.config.service || "http://master.whalejoy.com:2688";

        // 认证服务器地址
        this.accountService    = null;

        // 游戏服务器地址
        this.gameService       = null;

        // 游戏服务器连接
        this.socket            = null;

        // 消息序列号
        this.msgIndex          = 0;

        // 回调队列
        this.handlers          = {};

        // 服务器列表
        // { id: Number, name: String, addr: address port: port }
        this.servers           = [];

        // 服务器ID
        this.serverId          = 0;

        // 服务器唯一标识
        this.uuid              = null;

        // 认证令牌
        this.token             = null;

        this.init();
    }

    Laya.class(NetManager, "NetManager", _super);

    NetManager.prototype.init = function() {
        this.socket = new SocketIO();
        
        this.socket.on(SocketIO.CONNECTED, this, this.onServerConnected);
        this.socket.on(SocketIO.DICONNECTED, this, this.onServerDisconnected);
        this.socket.on(SocketIO.ERROR, this, this.onServerError);
        this.socket.on(SocketIO.CLOSED, this, this.onServerClosed);
        this.socket.on(SocketIO.MESSAGE, this, this.onServerMessage);

        this.event(Narwhale.Event.INITED);
    };

    NetManager.prototype.encode = function(params) {
        var key;
        var keys = [];
        for (key in params) {
            if (key == 'signature') {
                continue;
            }

            keys.push(key);
        }

        keys.sort();

        var url = '';
        for (var i = 0, size = keys.length; i < size; i++) {
            key = keys[i];
            url += key + '=' + encodeURIComponent(params[key]);
            if (i < keys.length - 1)
            {
                url += '&';
            }
        }

        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(url, App.config.appKey + 'narwhale&'));
    };

    NetManager.prototype.formatURL = function(uri, params) {
        if (!params.signature) {
            params.appID = App.config.appID;
            params.channelID = App.config.channelID;
            params.udid = App.storageManager.getDeviceId();

            params.signature = this.encode(params);
        }

        var url = uri + '?';

        for (var key in params)
        {
            url += key + '=' + encodeURIComponent(params[key]) + '&';
        }

        url = url.substring(0, url.length-1);
        return url;
    };

    NetManager.prototype.resolve = function(path) {
        if (path.charAt(path.length - 1) == "/") {
            return path.substr(0, path.length - 1);
        }

        return path;
    };

    NetManager.prototype.get = function(url, handler) {
        var http = new Laya.HttpRequest();

        var onHttpRequestComplete = function() {
            if (http.data.code == CODE.OK) {
                handler.runWith([null, http.data.data]);
            }
            else {
                var error = {
                    number: http.data.subcode,
                    message: http.data.message
                };
                handler.runWith(error);
            }
        };

        var onHttpRequestError = function(e) {
            var error = {
                number: CODE.HTTP.REQUEST_ERROR,
                message: e
            };
            handler.runWith(error, {});
        };

        // var onHttpRequestProgress = function(e) {
        //    console.log("http progress", e);
        // };

        //http.once(Laya.Event.PROGRESS, null, onHttpRequestProgress);
        http.once(Laya.Event.ERROR, null, onHttpRequestError);
        http.once(Laya.Event.COMPLETE, null, onHttpRequestComplete);
        http.send(url, null, 'get', 'json');
    };

    NetManager.prototype.post = function() {

    };

    NetManager.prototype.send = function(router, data, handler) {
        var msg = {};

        msg.id = ++this.msgIndex;
        msg.router = router;
        msg.data = data;

        if (handler != undefined) {
            this.handlers[msg.id] = handler;
        }

        this.socket.send(msg);
    };

    NetManager.prototype.loadConfigs = function(handler) {
        var self = this;
        var api = "/configs";
        var url = this.formatURL(this.masterService + api, {
            appID: App.config.appID,
            channelID: App.config.channelID,
            udid: App.storageManager.getDeviceId(),
            environment: App.config.environment,
            version: App.config.version
        });

        var complete = function(err, data) {
            if (err == null) {
                self.masterService = self.resolve(data.master);
            }

            if (handler) {
                handler.runWith([err, data]);
            }
        };
        
        this.get(url, Laya.Handler.create(null, complete));
    };

    NetManager.prototype.loadServers = function(handler) {
        var self = this;
        var api = "/servers";
        var url = this.formatURL(this.masterService + api, {
            appID: App.config.appID,
            channelID: App.config.channelID,
            udid: App.storageManager.getDeviceId(),
            environment: App.config.environment,
            version: App.config.version
        });

        var complete = function(err, data) {
            if (err == null) {
                self.servers = data;
            }

            if (handler) {
                handler.runWith([err, data]);
            }
        };

        this.get(url, Laya.Handler.create(null, complete));
    };

    NetManager.prototype.accountAuth = function(handler) {
        var self = this;
        var api = "/user/verify";
        var url = this.formatURL(this.accountService + api, {
            appID: App.config.appID,
            channelID: App.config.channelID,
            udid: App.storageManager.getDeviceId(),
            signature: ""
        });

        var complete = function(err, data) {
            if (err == null) {
                self.uuid = data.uuid;
                self.token = data.token;
            }

            if (handler) {
                handler.runWith([err, data]);
            }
        };

        this.get(url, Laya.Handler.create(null, complete));
    };

    NetManager.prototype.getOrderId = function(handler) {
        var api = "/pay/getOrderID";
        var url = this.formatURL(this.accountService + api, {
            appID: App.config.appID,
            channelID: App.config.channelID,
            udid: App.storageManager.getDeviceId(),
            signature: ""
        });

        this.get(url, handler);
    };

    NetManager.prototype.getServers = function() {
        return this.servers;
    };

    NetManager.prototype.getServer = function(id) {
        for (var i = 0, size = this.servers.length; i < size; i++){
            var server = this.servers[i];
            if (server.id == id){
                return server;
            }
        }

        return null;
    };

    NetManager.prototype.getServerIndex = function(id) {
        for (var i = 0, size = this.servers.length; i < size; i++){
            var server = this.servers[i];
            if (server.id == id) {
                return i;
            }
        }

        return 0;
    };

    NetManager.prototype.selectServer = function(selectIndex) {
        var server = this.servers[selectIndex];
        if (server == null) {
            return;
        }

        this.serverId = server.id;
        this.accountService = this.resolve(server.service);
        this.gameService = "http://" + server.addr + ":" + server.port;
        App.storageManager.setItem("serverId", server.id);
    };

    NetManager.prototype.connectServer = function() {
        this.socket.connect(this.gameService);
    };

    NetManager.prototype.onServerConnected = function() {
        this.event(SocketIO.CONNECTED);
    };

    NetManager.prototype.onServerDisconnected = function() {
        this.event(SocketIO.DICONNECTED);
    };

    NetManager.prototype.onServerError = function() {
        this.event(SocketIO.ERROR);
    };

    NetManager.prototype.onServerClosed = function() {
        this.event(SocketIO.CLOSED);
    };

    NetManager.prototype.onServerMessage = function(data) {
        try {
            var msg = JSON.parse(data);
            var handler = this.handlers[msg.id];

            if (handler != undefined) {
                if (msg.code == CODE.OK) {
                    handler.runWith([null, msg.data]);
                }
                else {
                    var error = {
                        number: msg.err,
                        message: msg.msg
                    };
                    handler.runWith(error);
                }

                delete this.handlers[msg.id];
            }
        }
        catch (e) {
            console.log(e.stack);
        }


    };

    return NetManager;
}(laya.events.EventDispatcher));