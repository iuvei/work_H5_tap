/**
 * Created by WhelaJoy on 2017/1/6.
 */
var OffLineGoldCoinBox = (function(_super){
    function OffLineGoldCoinBox(opt){
        OffLineGoldCoinBox.super(this);
        this._info = opt.info;
        this._jumpTimes = 0;
        this._accelerate = -3800;
        this._finished = false;
        this.initView();
    }
    Laya.class(OffLineGoldCoinBox,"HorizontalItemBox",_super);

    var _proto = OffLineGoldCoinBox.prototype;

    _proto.initView = function(){
        this._view = Laya.Sprite();
        this.addChild(this._view);
        this._view.loadImage(this._info.getIconPath());
    };

    _proto.update = function(dt){
        if(this._state == "start"){
            this.updateStart(dt);
        }
        if(this._state == "collect"){
            this.updateCollect(dt);
        }
        if(this._state == "end"){
            this.dispose();
        }
    };

    _proto.updateStart = function(dt){
        this._delay-=dt;
        if(this._delay<=0){
            this.doCollectAction();
        }
    };

    _proto.updateCollect = function(dt){
        this._actTime += dt;
        if(this._actTime >= this._collectTime){
            this._actTime = this._collectTime;
            this._state = "end";
        }

        var scale = this._actTime/this._collectTime;
        var sinScale = Math.sin(1.57*scale);
        var sinScaleV = Math.sin(3.14*scale);
        var pos = {x:this._startPos.x + this._X*scale, y:this._startPos.y + this._Y*sinScale + this._V*sinScaleV};
        this._view.scale(1.0 - 0.3*sinScale,1.0 - 0.3*sinScale);

        var opacity = 500 - 400*sinScale;
        if(opacity>255)
            opacity = 255;

        this._view.alpha = Math.round(opacity) / 255;
        this.pos(pos.x,pos.y);
    };

    _proto.doStartAction = function(){
        if(this._state == "start") return;
        this._state = "start";
        this._startPos = this._info._startPos;
        this._speed = this._info.speed;
        this._delay = this._info.delay;
    };

    _proto.doCollectAction = function(){
        if(this._state == "collect") return;
        this._state = "collect";
        this._startPos = Point.p(this.x,this.y);
        this._endPos = this._info.collectPos;
        this._X = this._endPos.x - this._startPos.x;
        this._Y = this._endPos.y - this._startPos.y;
        this._V = this._info.v;
        this._actTime = 0;
        this._collectTime = (Point.pDistance(this._startPos, this._endPos)+Math.abs(this._V))/this._info.speed;
    };

    _proto.doClickCB = function(){
        this.doCollectAction();
    };

    _proto.dispose = function(){
        this.removeSelf();

        this._state = "dispose";
        this._finished = true;
    };

    _proto.isFinished = function(){
        return this._finished;
    };

    return OffLineGoldCoinBox
})(Laya.Sprite);