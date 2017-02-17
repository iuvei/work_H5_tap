var ServerNameBox = (function(_super) {
    function ServerNameBox() {
        ServerNameBox.super(this);
    }

    Laya.class(ServerNameBox, "ServerNameBox", _super);

    ServerNameBox.prototype.onRender = function(data) {

    };

    ServerNameBox.renderHandler = function(cell, index) {
        cell.onRender(cell.dataSource);
    };

    return ServerNameBox;
}(ServerNameBoxUI));
    
var SelectServerDialog = (function(_super) {
    function SelectServerDialog() {
        SelectServerDialog.super(this);

        this.init();
    }

    Laya.class(SelectServerDialog, "SelectServerDialog", _super);

    SelectServerDialog.prototype.init = function() {

        var list = new laya.ui.List();
        var render = ServerNameBox;
        var servers = App.netManager.getServers();

        var data = [];
        for (var i = 0, size = servers.length; i < size; i++) {
            data.push({
                server: servers[i].name
            });
        }

        list.array = data;
        list.itemRender = render || new laya.ui.Box();

        list.x = this.boxServers.x;
        list.y = this.boxServers.y;
        list.width = this.boxServers.width;
        list.height = this.boxServers.height;

        list.repeatX = 2;
        list.spaceX = 20;
        list.spaceY = 10;
        list.vScrollBarSkin = "";
        list.selectEnable = true;
        list.renderHandler = new Laya.Handler(render, render.renderHandler);
        list.selectHandler = new Laya.Handler(this, this.onSelect);

        this.addChild(list);
    };

    SelectServerDialog.prototype.onSelect = function(selectIndex) {
        this.event(Laya.Event.CHANGE, selectIndex);
        this.close();
    };

    SelectServerDialog.prototype.close = function() {
        _super.prototype.close.call(this);
        App.uiManager.removeUiLayer(this);
    };

    return SelectServerDialog;
}(SelectServerDialogUI));