/**
 * Created by WhelaJoy on 2017/1/6.
 */
var GoldCoinLayer = (function(_super){
    function GoldCoinLayer(){
        GoldCoinLayer.super(this);
        this._copperList = [];
        this._copperInfos = [];
        this.init();
    }
    Laya.class(GoldCoinLayer,"GoldCoinLayer",_super);
    var _proto = GoldCoinLayer.prototype;

    _proto.init = function (){
        Laya.timer.frameLoop(1, this, this.update);
    };

    //怪物和宝箱金币
    _proto.addGold = function(coinInfo,startPos,speed){
        if(!startPos)
            startPos = Point.p(320,Math.random()* 5 + 500);     //金币初始的坐标
        if(!speed){
            speed =	{x:300 - Math.random()*600,y:500 + Math.random()*500};
        }

        var endPos = Point.p(0, 600);                           //金币掉落的Y坐标（设置最低点）
        var dropInfo = new DropInfo(coinInfo,startPos,endPos);
        dropInfo.speed = speed;
        dropInfo.collectPos = App.getRunView().getGoldPos();       //金币效果，移动到最终的目标坐标
        dropInfo.startPos = startPos;

        //每帧允许创建3个
        this._copperAddNum--;
        if(this._copperAddNum >= 0){
            this.createFallCopper(dropInfo);
        }else{
            this._copperInfos.push(dropInfo);
        }
    };

    _proto.createFallCopper = function(info){
        var item = new CoinBox(info);
        this.addChild(item);
        item.pos(info.startPos.x,info.startPos.y);
        item.doFallAction();

        this._copperList.push(item);
    };

    //离线金币
    _proto.addOffLineGold = function(num,startPos,speed,delay){
        if(!startPos)
            startPos = Point.p(-285 + Math.random()*50 - 25, 350 + Math.random()*50 - 25);
        if(!speed)
            speed = 500;

        var endPos = cc.p(Math.random()* 300*2 - 300, 0);
        var info = new DropInfo(CategoryType.COPPER,num,startPos,endPos);
        info.speed = speed;
        info.collectPos = GlobalData.copperPos;
        info.v = Math.random()*300-200;
        info.delay = delay;

        var item = new OffLineGoldCoinBox(info);
        this.addChild(item);
        item.pos(startPos.x,startPos.y);
        item.doStartAction();

        this._copperList.push(item);
    };

    _proto.update = function(){
        var dt = Laya.timer.delta/1000;
        for(var i=0;i<3;++i){
            var copperInfo = this._copperInfos.shift();
            if(copperInfo){
                this.createFallCopper(copperInfo);
            }
        }
        this._copperAddNum = 3;

        for(var i=0;i<this._copperList.length;){
            var copper = this._copperList[i];
            copper.update(dt);
            if(copper.isFinished()){
                this.removeChild(copper);
                this._copperList.splice(i,1);
            }else{
                ++i;
            }
        }
    };

    _proto.dispose = function(){
        this.removeSelf();
    };
    return GoldCoinLayer
})(Laya.Sprite);