/**
 * Created by WhelaJoy on 2017/1/6.
 */
var CoinBox = (function(_super){
    function CoinBox(info){
        CoinBox.super(this);
        this.resetInfo(info);
        this._jumpTimes = 0;
        this._accelerate = -3800;
        this._finished = false;
        this.initView();
    }
    Laya.class(CoinBox,"CoinBox",_super);
    var _proto = CoinBox.prototype;
    _proto.initView = function(){
        this._view = new Laya.Image();
        this._view.anchorX = 0.5;
        this._view.anchorY = 0.5;
        this.addChild(this._view);
        this._view.skin = this._info.getIconPath();

    };

    _proto.update = function(dt){
        if(this._state == "fall"){
            this.updateFall(dt);
        }
        if(this._state == "wait"){
            this.updateWait(dt);
        }
        if(this._state == "collect"){
            this.updateCollect(dt);
        }
        if(this._state == "end"){
            this.dispose();
            if(this._data){
                var player = App.player;
                player.syncPlayer(this._data);
            }
        }
    };

    _proto.updateFall = function(dt){
        this._actTime += dt;
        var nowSpeedY = (this._speedY + this._accelerate*this._actTime);
        var y = -(this._speedY + this._accelerate*this._actTime/2)*this._actTime;
        var x = this._speedX * this._actTime;

        if(this._speedX > 0)
            this._endPosX = Laya.stage.width - 20;
        else
            this._endPosX = Laya.stage.width + 20;

        var pos = {x:this._startPos.x + x, y:this._startPos.y + y};
        if(Math.abs(this._endPosX) < Math.abs(this._startPos.x + x)){
            pos.x = this._endPosX;
        }

        if(pos.y >= this._endPosY){
            pos.y = this._endPosY;

            this._startPos = pos;
            this._speedX = this._speedX * 0.6;
            this._speedY = -nowSpeedY * 0.3;
            this._jumpTimes++;

            //跳一次
            if (this._jumpTimes > 1) {
                this._state = "wait";


                this._waitTime = this._info.getDuration()/1000;
                this._actTime = 0;
                this.setItemClick();
            }
            //响一下
            else {
                //GlobalData.playEffect(SOUND.COPPER);
            }
            this._actTime = 0;
        }
        this.pos(pos.x,pos.y);
    };

    _proto.updateWait = function(dt){
        this._actTime += dt;
        if(this._actTime > this._waitTime){
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
        var pos = {x:this._startPos.x + this._X*scale, y:this._startPos.y + this._Y*sinScale};
        this._view.scale(1.0 - 0.3*sinScale,1.0 - 0.3*sinScale);

        var opacity = 500 - 400*sinScale;
        if(opacity > 255)
            opacity = 255;
        this._view.alpha = Math.round(opacity)/255;
        this.pos(pos.x,pos.y);
    };

    _proto.doFallAction = function(){
        if(this._state == "fall") return;
        this._state = "fall";
        this._startPos = this._info._startPos;
        this._speedX = 350 - Math.random()*700;
        this._speedY = 900 + Math.random()*300;
        this._actTime = 0;
        this._view.alpha = 1;
        this._view.scale(1,1);
    };


    _proto.doCollectAction = function(){
        if(this._state == "collect")
            return;
        this._state = "collect";
        this._startPos = Point.p(this.x,this.y);
        this._endPos = this._info.collectPos;
        this._X = this._endPos.x - this._startPos.x;
        this._Y = this._endPos.y - this._startPos.y;
        this._actTime = 0;
        this._collectTime = Point.pDistance(this._startPos,this._endPos)/400;

        if (this._info._type == Game.Coin.TYPE_GOLD){
            App.uiManager.event(Narwhale.Event.Battle.ADDNUMCOIN,[this._info.getCount(),Point.p(this.x,this.y)]);
        }
        else if (this._info._type == Game.Coin.TYPE_DIAMOND){
            var player = App.player;
            player.event(Game.Player.UPDATEDIAMOND);
        }
        else if (this._info._type == Game.Coin.TYPE_RELICS){
            var player = App.player;
            player.event(Game.Player.UPDATERELIC);
        }
        //捡取
        this.onPickUp();
    };

    _proto.doClickCB = function(){
        this.doCollectAction();
    };

    _proto.onPickUp = function(){
        var player = App.player;

        var route = "player.pickup";
        var data = {};
        data.uuid = this._info.getCoinInfo().uuid;

        App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
            if (!err) {
                this._data = data;
            }
        }));
    };

    _proto.setWaitTime = function(time){
        this._waitTime = time || 0.5;
        this._actTime = 0;
    };

    _proto.setItemClick = function(){
        this._view.on(Laya.Event.CLICK, this, this.doClickCB);
    };

    _proto.resetInfo = function(info){
        this._info = info;
        this._endPosY = this._info.getEndPos().y || 0;
    };

    _proto.dispose = function(){
        this.removeSelf();

        this._state = "dispose";
        this._finished = true;
    };

    _proto.isFinished = function(){
        return this._finished;
    };

    return CoinBox
})(Laya.Sprite);



