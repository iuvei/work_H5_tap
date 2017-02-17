/**
 * Created by WhelaJoy on 2017/1/4.
 */
//关卡推进动画界面
var LevelInfoDialog = (function(_super){
    function LevelInfoDialog(){
        LevelInfoDialog.super(this);
        this.initView();
    }
    Laya.class(LevelInfoDialog,"LevelInfoDialog",_super);

    LevelInfoDialog.prototype.initView = function(){
        this._pos = [Point.p(-140,0),Point.p(-70,0),Point.p(0,0),Point.p(70,0),Point.p(140,0)];
        this._scales = [0,0.75,1,0.75,0];
        this._iconList = [];
        for(var i = 0; i < 5; i++){
            var icon = new LevelIconDialog();
            icon.pos(this._pos[i].x,this._pos[i].y);
            icon.setIconScale(this._scales[i]);
            this._iconList.push(icon);
            this.addChild(icon);
        }
    };

    LevelInfoDialog.prototype.setIndex = function(index){
        this._curIndex = index;
        for(var i = 0; i < this._iconList.length; i++){
            var iconIndex = index + i - 2;
            if(iconIndex <= 0){
                this._iconList[i].visible = false;
                this._iconList[i].setLevel();
            }
            else{
                this._iconList[i].visible = true;
                var path = this.getIconPath(iconIndex);
                this._iconList[i].setIconTexture(path);
                this._iconList[i].setLevel(iconIndex);
            }
        }
    };

    LevelInfoDialog.prototype.getGameTabel = function(id){
        return Game.Game.STAGE_LIST[this.getLevelTableIndex(id)];
    };

    LevelInfoDialog.prototype.getLevelTableIndex = function(stage){
        var ret = stage % 50;
        if(ret == 0)
            ret = 50;

        return ret;
    };

    LevelInfoDialog.prototype.changeIndex = function(index){
        if(!this._curIndex){
            this.setIndex(index);
            return;
        }
        if(this._curIndex == index)
            return;
        this._curIndex = index;

        for(var i = 0; i < this._iconList.length; i++){
            var iconIndex = this._curIndex + i - 3;
            if(iconIndex <= 0){
                this._iconList[i].visible = false;
                this._iconList[i].setLevel();
            }
            else{
                this._iconList[i].visible = true;
                var path = this.getIconPath(iconIndex);
                this._iconList[i].setIconTexture(path);
                this._iconList[i].setLevel(iconIndex);
            }
        }
        var icon = this._iconList.shift();
        this._iconList.push(icon);

        this.doIconAction();
    };

    LevelInfoDialog.prototype.doIconAction = function(){
        for(var i = 0; i < this._iconList.length;i++){
            var act1 = MoveTo.create(0.3,this._pos[i]);
            var act2 = ScaleTo.create(0.3,this._scales[i]);
            App.actionManager.stopAllActions(this._iconList[i]);
            App.actionManager.runAction(act1, this._iconList[i]);
            this._iconList[i].runIconAction(act2);
        }
    };

    LevelInfoDialog.prototype.getIconPath = function(id){
        var table = this.getGameTabel(id);
        var index = (id % 10)%5;
        if(index == 0)
            index = 1;
        return "assets/icons/stages/" + table['bgId'] +"/" + index + ".png";
    };

    LevelInfoDialog.prototype.dispose = function(){
        this.removeSelf();
    };

    return LevelInfoDialog
})(Laya.Sprite);