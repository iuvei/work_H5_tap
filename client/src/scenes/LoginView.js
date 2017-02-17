var LoginView = (function(_super) {
    function LoginView() {
        LoginView.super(this);
    }

    Laya.class(LoginView, "LoginView", _super);

    LoginView.prototype.init = function() {
        var serverId = App.storageManager.getItem("serverId");
        if (serverId) {
            var index = App.netManager.getServerIndex(serverId);
            if (index != -1) {
                App.netManager.selectServer(index);
            }
        }

        this.dlgStatus = new NetStatusDialog();

        this.setServerName();

        this.btnEnter.on(Laya.Event.CLICK, this, this.onEnterClick);
        this.btnSelect.on(Laya.Event.CLICK, this, this.onServerClick);
    };

    // 进入游戏
    LoginView.prototype.onEnterClick = function() {
        this.btnEnter.disabled = true;
        this.dlgStatus.show();
        App.login();
    };

    LoginView.prototype.setStatus = function(text) {
        this.dlgStatus.setText(text);
    };

    // 显示服务器列表
    LoginView.prototype.onServerClick = function() {
        var dlgServerList = new SelectServerDialog();
        App.uiManager.addUiLayer(dlgServerList,{isAddShield:true,alpha:0.3});
        dlgServerList.once(Laya.Event.CHANGE, this, this.onServerSelect);
    };

    LoginView.prototype.onServerSelect = function(selectIndex) {
        App.netManager.selectServer(selectIndex);
        this.setServerName();
    };

    // 显示服务区
    LoginView.prototype.setServerName = function() {
        var serverName = "";
        var serverId = App.storageManager.getItem("serverId");
        if (serverId) {
            var server = App.netManager.getServer(serverId);
            if (server) {
                serverName = server.name;
            }
        }

        this.textServerName.text = serverName;
    };

    return LoginView;
}(LoginViewUI));