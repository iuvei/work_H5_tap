/**
 * Created by WhelaJoy on 2017/1/20.
 */

var ActorFariy = (function(_super) {
    function ActorFariy(opt) {
        var id = opt.id;
        // 初始化动作序列
        this.idle = "idle";
        this.idle2 = "idle2";
        _super.call(this, id);

        this.setFairyInfo(opt.info);
        this._actor = this;

    }

    Laya.class(ActorFariy, "ActorFariy", _super);
    var _proto = ActorFariy.prototype;

    ActorFariy.prototype.initEvent = function(){

        var hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(-40,-70, 80,70, "#000000");
        this.hitArea = hitArea;
        this.mouseEnabled = true;

        this.on(Laya.Event.CLICK,this,this.onClick);
        Laya.timer.frameLoop(1, this, this.update);
    };

    ActorFariy.prototype.removeEvent = function(){
        Laya.timer.clearAll(this);

        this.off(Laya.Event.CLICK,this,this.onClick);
    };

    ActorFariy.prototype.doAction = function(){
        this._time = 0;
        this._clicked = false;

        this._actionType = 2;
        var isAutoCollect = this._fairyInfo.getAutoCollect();
        if(!isAutoCollect){
            this._actionType = Math.ceil(Math.random() * 2);
            if(this._actionType <= 0){
                this._actionType = 1
            }
        }
        else{
            this._actionType = 3;
        }


        if(this._actionType == 1){
            //左边开始转圈
            this._start = Point.p(this._actor.x,this._actor.y);
            this._end = Point.p(540,360);
            this._state = 1;
            this._actor.setDir(1);
        }else if(this._actionType == 2){
            //右边开始转圈
            this._start = Point.p(this._actor.x,this._actor.y);
            this._end = Point.p(100,360);
            this._state = 1;
            this._actor.setDir(0);
        }else if(this._actionType == 3){
            //原地等待
            this._start = Point.p(this._actor.x,this._actor.y);
            this._end = Point.p(this._start.x, 360);

            var offsetX = Math.random()*50 - 25;
            this._end.x += offsetX;
            if(offsetX < 0)
                this._actor.setDir(0);

            var offsetY = Math.random()*50 - 25;
            this._end.y += offsetY;

            this._moveTime = Point.pDistance(this._start,this._end)/200;
            this._state = 1;
        }
        this.initEvent();
    };

    ActorFariy.prototype.setFairyInfo = function (info){
        this._fairyInfo = info;
    };

    ActorFariy.prototype.getFairyInfo = function (){
        return this._fairyInfo;
    };

    ActorFariy.prototype.removeFariy = function () {
        this.dispose();
    };

    ActorFariy.prototype.update = function() {
        var dt = Laya.timer.delta/1000;
        this._time += dt;
        if(this._actionType == 1){
            this.leftCircleAction(dt);
        }else if(this._actionType == 2){
            this.rightCircleAction(dt);
        }else if(this._actionType == 3){
            this.waitAction(dt);
        }
    };

    ActorFariy.prototype.leftCircleAction = function(dt) {
        if(this._state == 1){
            var scale = this._time/3;
            if(scale >= 1)
                scale = 1;

            var pos = {x:this._start.x + (this._end.x - this._start.x)*scale,
                y:this._start.y + (this._end.y - this._start.y)*scale};
            this._actor.pos(pos.x,pos.y);

            if(scale == 1){
                this._state = 2;
                this._circleList = [];
                this._circleList.push({x:540,h:-50,y:300,t:3});
                this._circleList.push({x:100,h:50,y:300,t:3});
                this._circleList.push({x:540,h:-50,y:300,t:3});
                this._circleList.push({x:100,h:50,y:300,t:3});
                this._circleList.push({x:540,h:-50,y:300,t:3});
                this._circleList.push({x:100,h:50,y:300,t:3});
                this._circleList.push({x:this._actor.x,h:0,y:-700,t:2});

                this.updateCircleEnd();
            }
        }else if(this._state == 2){
            var scale = this._time/this._deltaTime;
            if(scale >= 1)
                scale = 1;

            var pos = {x:this._start.x + (this._end.x - this._start.x)*scale,
                y:this._start.y + (this._end.y - this._start.y)*scale + this._h * Math.sin(scale*3.14)};
            this._actor.pos(pos.x,pos.y);

            if(scale == 1){
                if(!this.updateCircleEnd()){
                    this._state = 3;
                    this._ended = true;
                    this.removeFairyInfo();
                }
            }
        }
    };

    ActorFariy.prototype.rightCircleAction = function(dt) {
        if(this._state == 1){
            var scale = this._time/3;
            if(scale >= 1)
                scale = 1;

            var pos = {x:this._start.x + (this._end.x - this._start.x)*scale,
                y:this._start.y + (this._end.y - this._start.y)*scale};
            this._actor.pos(pos.x,pos.y);

            if(scale == 1){
                this._state = 2;
                this._circleList = [];
                this._circleList.push({x:100,h:50,y:300,t:3});
                this._circleList.push({x:540,h:-50,y:300,t:3});
                this._circleList.push({x:100,h:50,y:300,t:3});
                this._circleList.push({x:540,h:-50,y:300,t:3});
                this._circleList.push({x:100,h:50,y:300,t:3});
                this._circleList.push({x:540,h:-50,y:300,t:3});
                this._circleList.push({x:this._actor.x,h:0,y:-700,t:2});
                this.updateCircleEnd();
            }
        }else if(this._state == 2){
            var scale = this._time/this._deltaTime;
            if(scale >= 1)
                scale = 1;

            var pos = {x:this._start.x + (this._end.x - this._start.x)*scale,
                y:this._start.y + (this._end.y - this._start.y)*scale + this._h * Math.sin(scale*3.14)};
            this._actor.pos(pos.x,pos.y);

            if(scale == 1){
                if(!this.updateCircleEnd()){
                    this._state = 3;
                    this._ended = true;
                    this.removeFairyInfo();
                }
            }
        }
    };

    ActorFariy.prototype.waitAction = function(dt) {
        if(this._state == 1){
            var scale = this._time/this._moveTime;
            if(scale >= 1)
                scale = 1;

            var pos = {x:this._start.x + (this._end.x - this._start.x)*scale,
                y:this._start.y + (this._end.y - this._start.y)*scale};
            this._actor.pos(pos.x,pos.y);

            if(scale == 1){
                this._state = 2;
                this._moveTop = pos.y + 20;
                this._moveBottom = pos.y - 20;
                this._moveSpeed = 20;
                this._time = 0;
            }
        }else if(this._state == 2){
            if(this._clicked){
                var scale = this._time/this._deltaTime;
                if(scale >= 1)
                    scale = 1;

                var pos = {x:this._start.x + (this._end.x - this._start.x)*scale,
                    y:this._start.y + (this._end.y - this._start.y)*scale + this._h * Math.sin(scale*3.14)};
                this._actor.pos(pos.x,pos.y);

                if(scale == 1){
                    if(!this.updateCircleEnd()){
                        this._state = 3;
                        this._ended = true;
                        this.removeFairyInfo();
                    }
                }
            }else{
                var pos = Point.p(this._actor.x,this._actor.y);
                pos.y -= this._moveSpeed*dt;
                if(this._moveSpeed > 0){
                    if(pos.y >= this._moveTop)
                        this._moveSpeed = -20;
                }else{
                    if(pos.y <= this._moveBottom)
                        this._moveSpeed = 20;
                }
                this._actor.pos(pos.x,pos.y);

                this._time += dt;
                if(this._time > 4)
                    this.onClick();
            }
        }
    };

    ActorFariy.prototype.updateCircleEnd = function() {
        var info = this._circleList.shift();
        if(info){
            var pos = Point.p(this._actor.x,this._actor.y);
            this._start = Point.p(pos.x,pos.y);
            this._end = Point.p(info.x, info.y);
            this._h = info.h;
            this._time = 0;
            this._deltaTime = info.t;
            return true;
        }else{
            return false;
        }

    };

    ActorFariy.prototype.onClick = function() {
        if(this._clicked)
            return;
        if(this._state != 2)
            return;

        var pos = Point.p(this._actor.x,this._actor.y);
        this._clicked = true;

        //获得精灵奖励
        this._actor.play("idle2",true);
        this._circleList = [{x:pos.x,h:0,y:-700,t:2}];
        this.updateCircleEnd();
        this._state = 2;

        App.uiManager.event(Narwhale.Event.Battle.ADDAWARDBOX,[this._fairyInfo,pos,this.dir]);
    };

    ActorFariy.prototype.removeFairyInfo = function() {
        if(!this._clicked){
            var player = App.player;

            var route = "fairy.remove";
            var data = {};
            data.uuid = this._fairyInfo.uuid;

            App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
                if(!err){
                    player.syncPlayer(data);
                }else{
                }
            }));
        }
        this.removeFariy();
    };

    return ActorFariy;

}(Actor));