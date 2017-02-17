
var ActorHero = (function(_super) {
    function ActorHero(opt) {
        var id = opt.id;
        // 初始化动作序列
        this.idle = "idle";
        _super.call(this, id);

        this._heroObj = opt.info;

        this.attacks = [ "attack" ];

        this.attackDelta = 0;
        Laya.timer.frameLoop(1, this, this.update);

        if(!this._heroObj.active()){
            this.dieShow();
        }

        this.initEvent();
    }

    Laya.class(ActorHero, "ActorHero", _super);
    var _proto = ActorHero.prototype;

    ActorHero.prototype.initEvent = function(){
        if(this._heroObj){
            this._heroObj.on(Game.Hero.LEVELCHANGE,this,this.updateUpgradeShow);
            this._heroObj.on(Game.Hero.DEAD,this,this.updateDieShow);
            this._heroObj.on(Game.Hero.REVIVED,this,this.updateReviveShow);
        }
    };

    ActorHero.prototype.doEffect = function(id){
        var effect = SpineEffect.create(id);
        if (effect != null) {
            effect.setDir(this.db.dir);
            effect.play();
            this.addChild(effect);
        }
        return effect;
    };

    //升级特效
    ActorHero.prototype.doUpgradeEffect = function(){
        this.doEffect(300032);
        this.doEffect(300033);
    };

    ActorHero.prototype.updateUpgradeShow = function(){
        //更新英雄升级效果
        console.log("hero upLv");
        if(this._heroObj.level <= 1){
            this.doReviveEffect();
        }
        this.doUpgradeEffect();
    };

    ActorHero.prototype.updateDieShow = function(){
        this.doDieEffect();
        this.dieShow();
    };
    //死亡特效
    ActorHero.prototype.doDieEffect = function(){
        this.doEffect(300016);
        this.doEffect(300017);
    };

    ActorHero.prototype.dieShow = function (){
        console.log("hero die");
        this._isDie = true;
        this.animation.paused();
        this.animation.visible = false;

        var id = (this.db.isFly) ? 900002 : 900001;

        this._dieEffect = this.doEffect(id);
    };

    ActorHero.prototype.updateReviveShow = function(){
        this.doReviveEffect();
        this.doUpgradeEffect();
        this.reviveShow();
    };
    //复活特效,出现特效
    ActorHero.prototype.doReviveEffect = function(){
        this.doEffect(300031);
    };

    ActorHero.prototype.reviveShow = function (){
        console.log("hero revive");
        this._isDie = false;
        this.animation.resume();
        this.animation.visible = true;

        if(this._dieEffect){
            this._dieEffect.removeSelf();
            this._dieEffect = null;
        }

    };

    ActorHero.prototype.update = function() {
        if(this._isDie){

            return;
        }

        this.attackDelta += Laya.timer.delta;

        if (this.attackDelta >= this._heroObj.getFreq()) {
            this.attack();
            this.attackDelta = 0;

            if (this.db.effect) {
                var effect = SpineEffect.create(this.db.effect.id);
                if (effect != null) {
                    effect.setDir(this.db.dir);
                    effect.play();
                    this.addChild(effect);
                }
            }
        }
    };

    ActorHero.prototype.setHeroInfo = function (info){
        this._heroObj = info;
    };

    ActorHero.prototype.getHeroInfo = function (){
        return this._heroObj;
    };

    ActorHero.prototype.tweenEnd = function(target, dstX, dstY) {
        target.exit();
        this._heroObj.hit();

        var effect = SpineEffect.create(this.db.effect.id + 2);
        if (effect != null) {
            effect.x = dstX || 0;
            effect.y = dstY || 0;
            this.addChild(effect);

            effect.setDir(this.db.dir);
            effect.play();
        }
    };

    ActorHero.prototype.removeHero = function () {
        Laya.timer.clearAll();
        this.dispose();
    };

    ActorHero.prototype.animationEvent = function(e) {
        if (e.name === "attack") {

            // Spine的特效播放问题比较多，细节先暂时不处理了
             var effect;
             if (this.db.effect.type == "shoot" || this.db.effect.type == "throw") {
                 effect = SpineEffect.create(this.db.effect.id  + 1);
                 if (effect == null) {
                     return;
                 }
                 effect.setDir(this.db.dir);

                 var dstX = (320 - 80 + Math.random() * 160 / 2) - this.parent.x;
                 var dstY = 617 - (160 - 55) - Math.random() * 110 - this.parent.y;

                 var p1 = Point.p(0, 0);
                 var p2 = Point.p(dstX, dstY);
                 var rotation = Narwhale.radiansToDegrees(Point.pToAngle(Point.pSub(p2, p1)));
                 rotation = (p1.x > p2.x) ? 180 - rotation : rotation;

                 //console.log(p1, p2, rotation);
                 if(this.db.dir){
                     effect.rotation = rotation + 270;
                 }
                 else{
                     effect.rotation = rotation;
                 }

                 effect.play();
                 this.addChild(effect);
                 var pos =  this.db.atkPos ||  Point.p(0, 0);
                 effect.pos(pos.x,pos.y);

                 App.actionManager.add(MoveBy.create(0.7, dstX, dstY), effect, Laya.Handler.create(this, this.tweenEnd, [effect,pos.x + dstX, pos.y + dstY]));
                 //Laya.Tween.to(effect, { x: dstX, y: dstY }, 0.4, Laya.Ease.strongIn, Laya.Handler.create(this, this.tweenEnd, [effect, dstX, dstY]));
             }
             else if(this.db.effect.type == "attack"){
                 this._heroObj.hit();
             }
             else if (this.db.effect.type == "throw") {
                //effect = SpineEffect.create(this.db.effect.id + 1);
                //if (effect == null) {
                //    return;
                //}
                //
                //effect.setDir(this.db.dir);
                //effect.play();
                //
                //this.addChild(effect);
                //
                //var dstX = (320 - 80 + Math.random() * 160 / 2) - this.parent.x;
                //var dstY = 617 - (160 - 55) - Math.random() * 55 - this.parent.y;
                //
                //var bezierBy = BezierBy.create(0.7, [
                //    { x: 0, y: 0 },
                //    { x: dstX/2, y: -500},
                //    { x: dstX, y: dstY }
                //]);
                //
                //App.actionManager.add(bezierBy, effect, Laya.Handler.create(this, this.tweenEnd, [effect, dstX, dstY]));
            }
        }
    };

    return ActorHero;
    
}(Actor));