/**
 * Created by WhelaJoy on 2017/1/4.
 */
//关卡推进icon界面
var LevelIconDialog = (function(_super){
    function LevelIconDialog(){
        LevelIconDialog.super(this);
        this.initView();
    }
    Laya.class(LevelIconDialog,"LevelIconDialog",_super);

    LevelIconDialog.prototype.initView = function(){
        this._node = new LevelIconBoxUI();
        this.addChild(this._node);

        this._iconNode = this._node.iconNode;
        this._icon = new Laya.Sprite();
        //this._icon.anchorX = 0.5;
        //this._icon.anchorY = 0.5;
        this._iconNode.addChild(this._icon);
        //this._icon.loadImage("assets/icons/heros/1001.jpg");
        this._icon.pivot(22,22);
        this._level = this._node.level;
    };

    LevelIconDialog.prototype.setIconTexture = function(textureUrl){
        //this._icon.graphics.clear();
        this._icon.loadImage(textureUrl);

        //var texture = Laya.loader.getRes(textureUrl);
        //this._icon.graphics.drawTexture(texture, 0, 0);
    };

    LevelIconDialog.prototype.setIconScale = function(val,y){
        var scaleX = val;
        var scaleY = y || val;
        this._node.scale(scaleX,scaleY);
    };

    LevelIconDialog.prototype.runIconAction = function(action){
        App.actionManager.stopAllActions(this._node);
        App.actionManager.runAction(action,this._node);
        //this._node.runAction(action);
    };

    LevelIconDialog.prototype.setLevel = function(val){
        if(val){
            this._level.text = val;
        }
        else{
            this._level.text = "";
        }

    };

    LevelIconDialog.prototype.dispose  = function(){
        this.removeSelf();
    };

    return LevelIconDialog
})(Laya.Sprite);