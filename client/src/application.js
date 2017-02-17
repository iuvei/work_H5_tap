/*
 *  单例模式
 */
var Application = (function() {
    function Application() {
    }

    Application.init = function() {
        // private members
        this._runningView = null;

        // Controllers
        this.netManager = new NetManager();
        this.storageManager = new StorageManager();
        this.actionManager = new ActionManager();
        this.uiManager = new UIManager();

        // Modules
        this.player = null;

        // Views
        this.loginView = null;
        this.battleView = null;
        this.loaderView = null;
        this.sceneView = null;
        this.createView = null;

        this.state = Application.STATE_INITED;
        this.millisecondDispersion = 0;
        
        console.log('application inited...');

        return this;
    };

    //获取服务器异步时间 毫秒
    Application.getAsyncMillisecond = function() {
        //小写x 当前本地毫秒毫秒
        var nowMillisecond = Number(Game.moment().format("x"));

        return this.millisecondDispersion + nowMillisecond;
    };

    //获取服务器异步时间 秒
    Application.getAsyncSecond = function() {
        //小写x 当前本地毫秒毫秒
        var nowMillisecond = Number(Game.moment().format("x"));

        return Math.floor((this.millisecondDispersion + nowMillisecond) / 1000);
    };

    Application.preload = function() {
        var self = this;

        // 开始加载资源
        this.state = Application.STATE_PRELOADING;
        this.runView(this.loaderView);
        async.series([
            function(callback) {
                self.loaderView.setText("加载图片...");

                var resources = Narwhale.preload;
                var onComplete = function() {
                    callback(null);
                };
                var onProgress = function(e) {
                    self.loaderView.changeValue(e);
                };

                Laya.loader.load(resources, Laya.Handler.create(null, onComplete), Laya.Handler.create(null, onProgress, null, false));
            },

            function(callback) {
                self.loaderView.setText("加载字体资源...");

                var fntResources = Narwhale.fntPreLoad;

                var fontName = {};
                var count = 0;

                function onFontLoaded(bitmapFont)
                {
                    //bitmapFont.setSpaceWidth(10);
                    Laya.Text.registerBitmapFont(fontName[bitmapFont._path], bitmapFont);
                    count +=1;
                    if(count >= fntResources.length)
                    {
                        callback(null);
                    }
                }

                for(var index in fntResources){
                    var bmpFont = new Laya.BitmapFont();
                    var url = fntResources[index].url;

                    if(fntResources[index].name){
                        fontName[url] = fntResources[index].name;
                    }
                    else{
                        var start = url.lastIndexOf("/")+1;
                        var len = url.lastIndexOf(".") - start;
                        fontName[url] = url.substr(start,len);
                    }
                    bmpFont.loadFont(url, Laya.Handler.create(this, onFontLoaded, [bmpFont]));
                }
            },

            function(callback) {
                self.loaderView.setText("初始化界面资源...");

                var onInited = function() {
                    callback(null);
                };
                
                self.uiManager.once(Narwhale.Event.INITED, null, onInited);
                self.uiManager.init();
            }
        ], function(err, results) {
            self.loginView = new LoginView();
            self.createView = new CreateView();
            self.battleView = new BattleView();

            self.state = Application.STATE_PRELOADED;
            console.log('application preloaded...');
        });
    };


    Application.loadConfigs = function() {
        var self = this;

        self.state = Application.STATE_CONFIG_LOADING;
        self.loaderView.setText("获取服务器配置...");

        var onLoaded = function() {
            console.log("configs loaded...");
            self.state = Application.STATE_CONFIG_LOADED;
        };

        self.netManager.loadConfigs(Laya.Handler.create(null, onLoaded));
    };

    Application.loadServers = function() {
        var self = this;

        self.state = Application.STATE_SERVERS_LOADING;
        self.loaderView.setText("加载服务器列表...");

        var onLoaded = function() {
            console.log("servers loaded...");

            self.loginView.init();
            self.state = Application.STATE_SERVERS_LOADED;
        };

        self.netManager.loadServers(Laya.Handler.create(null, onLoaded));
    };

    Application.login = function() {
        var self = this;
        var onComplete = function(err, data) {
            if (err != null) {
                self.state = Application.STATE_RUNNING_LOGIN;
                return;
            }
            self.state = Application.STATE_AUTHORIZED;
            self.loginView.setStatus("认证成功!");

            console.log("account auth passed...", data);
        };

        self.loginView.setStatus("正在认证账号...");
        this.state = Application.STATE_AUTHORIZING;
        this.netManager.accountAuth(Laya.Handler.create(null, onComplete));
    };

    Application.connectServer = function() {
        var self = this;

        self.state = Application.STATE_SERVER_CONNECTING;
        self.loginView.setStatus("连接游戏服务器...");

        var onConnected = function() {
            self.loginView.setStatus("连接成功!");
            self.state = Application.STATE_SERVER_CONNECTED;
            console.log("game server connected...");
        };

        var onError = function() {
            console.log("error");
        };

        self.netManager.connectServer();
        self.netManager.once(SocketIO.CONNECTED, null, onConnected);
        self.netManager.once(SocketIO.ERROR, null, onError);
    };

    Application.fetchPlayer = function() {
        var self = this;

        self.state = Application.STATE_PLAYER_FETCHING;
        self.loginView.setStatus("正在获取游戏数据...");

        var route = "user.auth";
        var data = {
            uuid: App.netManager.uuid,
            udid: App.storageManager.getDeviceId(),
            appID: App.config.appID,
            channelID: App.config.channelID,
            serverID: App.netManager.serverId,
            token: App.netManager.token
        };
        self.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if (err != null) {
                return;
            }

             self.loginView.setStatus("获取成功!");

            if (data.player != null) {
                self.player = new Game.Player(data.player);
            }

            self.state = Application.STATE_PLAYER_FETCHED;
        }));
    };

    Application.createPlayer = function(name) {
        var self = this;

        var route = "user.create";
        var data = {
            name: name
        };
        self.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if (err != null) {
                return;
            }

            if (data.player == null) {
                return;
            }

            self.player = new Game.Player(data.player);
            self.state = Application.STATE_ROLE_CREATED;
        }));
    };

    Application.prepare = function() {
        var self = this;

        this.state = Application.STATE_PREPAREING;
        this.loaderView.reset();
        this.runView(this.loaderView);
        async.series([
            function(callback) {
                self.loaderView.setText("加载骨骼动画...");

                var actorFactory = new SpineFactory("actor", Narwhale.resource.actors);
                var onInited = function() {
                    actorFactory.off(Narwhale.Event.PROGRESS, null, onProgress);
                    callback(null);
                };
                var onProgress = function(e) {
                    self.loaderView.changeValue(e);
                };

                actorFactory.on(Narwhale.Event.PROGRESS, null, onProgress);
                actorFactory.once(Narwhale.Event.INITED, null, onInited);
                actorFactory.init();

                Narwhale.actorFactory = actorFactory;
            },

            function(callback) {
                self.loaderView.setText("加载光效资源...");

                var effectFactory = new SpineFactory("effect", Narwhale.resource.effects);
                var onInited = function() {
                    effectFactory.off(Narwhale.Event.PROGRESS, null, onProgress);
                    callback(null);
                };
                var onProgress = function(e) {
                    self.loaderView.changeValue(e);
                };

                effectFactory.on(Narwhale.Event.PROGRESS, null, onProgress);
                effectFactory.once(Narwhale.Event.INITED, null, onInited);
                effectFactory.init();

                Narwhale.effectFactory = effectFactory;
            }
        ], function(err, results) {
            self.state = Application.STATE_PREPARED;
        });
    };

    Application.enter = function() {
        var self = this;
        var route = "user.enter";
        var data = {
            uuid: App.storageManager.getDeviceId(),
            platform: "narwhale",
            openid: "",
            serverid: App.netManager.serverId,
            token: App.netManager.token
        };
        this.state = Application.STATE_WAITING_SERVER_ENTER;
        this.netManager.send(route, data, Laya.Handler.create(null, function(err, result) {
            //小写x 当前本地毫秒毫秒
            var nowMillisecond = Number(Game.moment().format("x"));
            if (result.millisecond != null) {
                self.millisecondDispersion = result.millisecond - nowMillisecond;
            }

            self.player.syncPlayer(result.player);
            self.player.stage.makeMonster();

            self.runView(self.battleView);
            self.battleView.init();//*战斗界面初始化

            self.state = Application.STATE_RUNNING_GAME;
            console.log('application running...');
        }));
    };

    Application.getRunView = function() {
        return this._runningView
    };

    Application.runView = function(view) {
        if (this._runningView) {
            Laya.stage.removeChild(this._runningView);
        }

        this._runningView = view;
        Laya.stage.addChild(this._runningView);
    };

    Application.start = function() {
        // 创建加载场景
        this.loaderView = new LoaderView();

        Laya.timer.frameLoop(1, this, this.loop);

        this.state = Application.STATE_STARTED;
        console.log('application started...');
    };

    Application.loop = function() {
        var running = false;
        var dt = Laya.timer.delta;

        switch (this.state) {
            // 预加载界面资源
            case Application.STATE_STARTED:
                this.preload();
                break;
            case Application.STATE_PRELOADING:
                break;
            // 加载服务器配置
            case Application.STATE_PRELOADED:
                this.loadConfigs();
                break;
            case Application.STATE_CONFIG_LOADING:
                break;
            // 加载服务器列表
            case Application.STATE_CONFIG_LOADED:
                this.loadServers();
                break;
            case Application.STATE_SERVERS_LOADING:
                break;
            // 显示登录界面
            case Application.STATE_SERVERS_LOADED:
                this.runView(this.loginView);
                this.state = Application.STATE_RUNNING_LOGIN;
                break;
            case Application.STATE_AUTHORIZING:
                break;
            // 连接游戏服务器
            case Application.STATE_AUTHORIZED:
                this.connectServer();
                break;
            case Application.STATE_SERVER_CONNECTING:
                break;
            // 获取玩家数据
            case Application.STATE_SERVER_CONNECTED:
                this.fetchPlayer();
                break;
            case Application.STATE_PLAYER_FETCHING:
                break;
            // 进入游戏或者显示创建角色界面
            case Application.STATE_PLAYER_FETCHED:
                if (this.player == null) {
                    this.runView(this.createView);
                    this.state = Application.STATE_RUNNING_CREATE;
                }
                else {
                    this.prepare();
                }
                break;
            case Application.STATE_ROLE_CREATING:
                break;
            // 初始化游戏资源
            case Application.STATE_ROLE_CREATED:
                this.prepare();
                break;
            case Application.STATE_PREPAREING:
                break;
            // 进入游戏
            case Application.STATE_PREPARED:
                this.enter();
                break;
            case Application.STATE_WAITING_SERVER_ENTER:
                break;
            case Application.STATE_RUNNING_LOGIN:
                break;
            case Application.STATE_RUNNING_CREATE:
                break;
            case Application.STATE_RUNNING_GAME:
                running = true;
                break;
            default:
                break;
        }

        if (running == false) {
            return;
        }

        // 计算DPS
    };

    Application.stop = function() {
    };

    Application.STATE_INITED = 1;
    Application.STATE_STARTED = 2;
    Application.STATE_PRELOADING = 3;
    Application.STATE_PRELOADED = 4;
    Application.STATE_CONFIG_LOADING = 5;
    Application.STATE_CONFIG_LOADED = 6;
    Application.STATE_SERVERS_LOADING = 7;
    Application.STATE_SERVERS_LOADED = 8;
    Application.STATE_AUTHORIZING = 9;
    Application.STATE_AUTHORIZED = 10;
    Application.STATE_SERVER_CONNECTING = 11;
    Application.STATE_SERVER_CONNECTED = 12;
    Application.STATE_PLAYER_FETCHING = 13;
    Application.STATE_PLAYER_FETCHED = 14;
    Application.STATE_PREPAREING = 15;
    Application.STATE_PREPARED = 16;
    Application.STATE_WAITING_SERVER_ENTER = 17;
    Application.STATE_ROLE_CREATING = 18;
    Application.STATE_ROLE_CREATED = 19;
    Application.STATE_RUNNING_LOGIN = 20;
    Application.STATE_RUNNING_CREATE = 21;
    Application.STATE_RUNNING_GAME = 22;
    
    return Application;
}());