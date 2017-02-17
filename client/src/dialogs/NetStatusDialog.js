var NetStatusDialog = (function(_super) {
    function NetStatusDialog() {
        NetStatusDialog.super(this);
    }

    Laya.class(NetStatusDialog, "NetStatusDialog", _super);

    NetStatusDialog.prototype.setText = function(text) {
        this.message.text = text;
    };

    return NetStatusDialog;
}(NetStatusDialogUI));