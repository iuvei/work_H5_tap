var LoaderView = (function(_super) {
    function LoaderView() {
        LoaderView.super(this);

        this.init();
    }

    Laya.class(LoaderView, "LoaderView", _super);

    LoaderView.prototype.init = function() {
    };

    LoaderView.prototype.start = function() {
        this.progress.value = 0;
        this.textPercent = "0%";
        this.show();
    };

    LoaderView.prototype.stop = function() {
        Laya.timer.once(1000, this, this.hide);
    };

    LoaderView.prototype.changeValue = function(v) {
        this.progress.value = v;
        this.percent.text = String((v * 100).toFixed(2)) + "%";
    };

    LoaderView.prototype.setText = function(s) {
        this.message.text = s;
    };

    LoaderView.prototype.show = function() {
        Laya.stage.addChild(this);
    };

    LoaderView.prototype.hide = function() {
        Laya.stage.removeChild(this);
    };

    LoaderView.prototype.reset = function() {
        this.progress.value = 0;
        this.textPercent = "0%";
    };

    return LoaderView;
}(LoaderViewUI));