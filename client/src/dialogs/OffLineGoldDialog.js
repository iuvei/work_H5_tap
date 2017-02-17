/**
 * Created by WhelaJoy on 2017/1/11.
 */
var OffLineGoldDialog = (function(_super){
    function OffLineGoldDialog(){
        OffLineGoldDialog.super(this);
        this.initView();
        this.initEvent();
    }
    Laya.class(OffLineGoldDialog,"OffLineGoldDialog",_super);

    OffLineGoldDialog.prototype.initEvent =function(){
        this.getBtn.on(Laya.Event.CLICK,this,this.onTouchGet,[1]);
        this.getx2Btn.on(Laya.Event.CLICK,this,this.onTouchGet,[2]);
        this.getx10Btn.on(Laya.Event.CLICK,this,this.onTouchGet,[10]);
    };

    OffLineGoldDialog.prototype.initView =function(){
        var player = App.player;
        var offlineGold = player.offlineGold;
        this.goldLab.text = Narwhale.Config.formatNumber(offlineGold) || "1";
    };

    OffLineGoldDialog.prototype.onTouchGet =function(rate){
        var self = this;
        var player = App.player;

        //暂时屏蔽
        if(rate != 1){
            return
        }

        var route = "player.getOfflineGold";
        var data = {
            uuid: App.storageManager.getDeviceId(),
            platform: "narwhale",
            openid: "",
            serverid: App.netManager.serverId,
            token: App.netManager.token
        };

        App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if(err){
                App.uiManager.showDialogByErrCode(err);
            }
            else{
                player.syncPlayer(data);
                self.close();
            }
        }));
    };

    OffLineGoldDialog.prototype.close =function(){
        _super.prototype.close.call(this);
        App.uiManager.removeUiLayer(this);
        App.uiManager.event(Narwhale.Event.Battle.CHECKOFFLINEGOLD);
    };

    return OffLineGoldDialog;
})(OfflineGoldTipsUI);