/**
 * Created by WhelaJoy on 2017/1/20.
 */
var ActorAwardBox = (function(_super) {
    function ActorAwardBox(opt) {
        var id = opt.id;
        // 初始化动作序列
        this.idle = "box";
        this.idle2 = "open";
        _super.call(this, id);

        this._actor = this;

        this.setFairyInfo(opt.info);
    }

    Laya.class(ActorAwardBox, "ActorAwardBox", _super);
    var _proto = ActorAwardBox.prototype;

    ActorAwardBox.prototype.initEvent = function(){
        var player = App.player;
        player.on(Game.Player.ADDFAIRYCOIN,this,this.addFairyCoin);

        Laya.timer.frameLoop(1, this, this.update);
    };

    ActorAwardBox.prototype.removeEvent = function(){
        Laya.timer.clearAll(this);

        var player = App.player;
        player.off(Game.Player.ADDFAIRYCOIN,this,this.addFairyCoin);
    };

    ActorAwardBox.prototype.doAction = function(){
        this._pos = Point.p(this._actor.x,this._actor.y);
        this._state = 1;
        this.initEvent();
    };

    ActorAwardBox.prototype.setFairyInfo = function (info){
        this._fairyInfo = info;
    };

    ActorAwardBox.prototype.getFairyInfo = function (){
        return this._fairyInfo;
    };

    ActorAwardBox.prototype.removeActorAwardBox = function () {
        this.dispose();
        this.removeEvent();
    };

    ActorAwardBox.prototype.update = function() {
        var dt = Laya.timer.delta/1000;
        if(this._state == 1){
            this._pos.y += dt*200;
            if(this._pos.y >= 610){
                //this._pos.y = 0;
                this._time = 1;
                this._state = 2;

                this.play("open", true);

                var time = DelayTime.create(0.5);
                var fadeOut = FadeOut.create(1);
                var actionSequence = Sequence.create(
                    time,
                    fadeOut
                );
                App.actionManager.runAction(actionSequence,this);

                this.onCollect();
            }

            this._actor.pos(this._pos.x,this._pos.y);
        }else if(this._state == 2){
            this._time-=dt;
            if(this._time <=0){
                this.removeActorAwardBox();
            }
        }
    };

    ActorAwardBox.prototype.onCollect = function () {
        var player = App.player;

        var route = "fairy.collect";
        var data = {};
        data.uuid = this._fairyInfo.uuid;

        App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
            if(!err){
                console.log("fairy.make : data =" + JSON.stringify(data));
                player.syncPlayer(data);
            }else{
                console.log("fairy.make : err =" + JSON.stringify(err));
            }
        }));
    };

    ActorAwardBox.prototype.addFairyCoin = function (uuid) {
        App.uiManager.event(Narwhale.Event.Battle.ADDFAIRYCOIN,[uuid,Point.p(this.x,this.y - 100)]);
    };

    return ActorAwardBox;

}(Actor));