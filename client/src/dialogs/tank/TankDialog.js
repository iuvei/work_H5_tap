var TankDialog = (function(_super){
    function TankDialog(){
        TankDialog.super(this);

        this.initView();
    }

    Laya.class(TankDialog,"TankDialog",_super);

    TankDialog.prototype.initView = function () {

    };

    TankDialog.prototype.close = function () {
        _super.prototype.close.call(this);
        App.uiManager.removeUiLayer(this);
    };

    return TankDialog;
})(TankDialogUI);
