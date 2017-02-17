/**
 * Created by WhelaJoy on 2017/1/6.
 */
(function(){
    var CopperNumGenTime = 0;

    this.NumAction = {
        getNum:function(num,size,color){
            return false;
            size = size || MAssetLabel.FS34;
            color = color || MAssetLabel.CGreen1;
            //var label = MAssetLabel.create(num,size,color);
            //label.mStroke();

            //label.onEnter = function(){
            //	cc.Sprite.prototype.onEnter.call(this);
            var act1 = cc.Spawn(cc.moveBy(0.4,cc.p(0,100)),cc.scaleTo(0.4,1.4,1.4));
            var act2 = cc.Spawn(cc.scaleTo(0.3,1.0,1.0),cc.moveBy(0.6,cc.p(0,60)),cc.fadeOut(0.6));
            label.runAction(cc.sequence(act1,act2,cc.callFunc(function(){this.removeFromParent();}.bind(label))));
            //};

            return label;
        },

        getHurtNum:function(num){
            var label  = new Laya.Label();
            label.text = num;
            label.font = "red";
            label.anchorX = 0.5;
            label.anchorY = 0.5;

            var act1 = Spawn.create(MoveBy.create(0.4, Point.p(0, -100)));
            var act2 = Spawn.create(MoveBy.create(0.2, Point.p(0, -40)), FadeOut.create(0.2));
            var callBack = CallFunc.create(Laya.Handler.create(this,function(){
                label.removeSelf();
            }));
            var actionSequence = Sequence.create(
                act1,
                act2,
                callBack
            );
            App.actionManager.runAction(actionSequence,label);
            return label;
        },

        getCopperNum:function(num,force){
            //控制创建间隔
            //if(!force){
            //    var date = GlobalData.getAsynServiceTime();
            //    if(date - CopperNumGenTime < 100)
            //        return;
            //    CopperNumGenTime = date;
            //}

            var label  = new Laya.Label();
            label.text = "+"+num;
            label.font = "yellow";
            label.anchorX = 0.5;
            label.anchorY = 0.5;

            var act1 = Spawn.create(MoveBy.create(0.4, Point.p(0, -100)));
            var act2 = Spawn.create(MoveBy.create(0.2, Point.p(0, -40)), FadeOut.create(0.2));
            var callBack = CallFunc.create(Laya.Handler.create(this,function(){
                label.removeSelf();
            }));
            var actionSequence = Sequence.create(
                act1,
                act2,
                callBack
            );
            App.actionManager.runAction(actionSequence,label);
            return label;
        },

        getOfflineCopperNum: function(num, force){
            var label = new cc.LabelBMFont(num,"res/ui/fonts/yellow.fnt");
            //label.onEnter = function(){
            //	cc.Sprite.prototype.onEnter.call(this);
            var act1 = cc.Spawn(cc.moveBy(2.0, cc.p(0, 150)));
            var act2 = cc.Spawn(cc.scaleTo(0.5, 1.0, 1.0), cc.moveBy(0.6, cc.p(0, 60)), cc.fadeOut(0.6));
            label.runAction(cc.sequence(act1,act2,cc.callFunc(function(){this.removeFromParent();}.bind(label))));
            //};

            return label;
        }
    };
})();