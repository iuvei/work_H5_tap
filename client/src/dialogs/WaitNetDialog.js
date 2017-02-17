/**
 * Created by WhelaJoy on 2017/1/4.
 */
var WaitNetPanel = (function(_super){
    function WaitNetPanel(tips,tagget){
        WaitNetPanel.super(this);
        this.initView(tips,tagget);
    }
    Laya.class(WaitNetPanel,"WaitNetPanel",_super);
    var _proto = WaitNetPanel.prototype;

    _proto.initView = function(tips,tagget){
        //屏蔽层
        var maskArea = new Sprite();
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this.addChild(maskArea);
        hitArea = new HitArea();
        hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        maskArea.hitArea = hitArea;
        maskArea.mouseEnabled = true;
        maskArea.zOrder = -1;

        if(tagget)
            maskArea.alpha = 0;

        this._tips = tips;
        this.initEvent();
    };

    _proto.initEvent = function(){
        this._time = 0;
        this._index = 0;	//loading0001.png ~ loading0013.png
        this.updateShow();
        Laya.timer.frameLoop(1, this, this.update);
    };

    _proto.updateShow = function(){

    };

    _proto.update = function(){
        this._time+=dt;
        if(this._time>=0.05){
            this._time = 0;
            this.updateShow();
        }
    };

    return WaitNetPanel;
})(Laya.Sprite);