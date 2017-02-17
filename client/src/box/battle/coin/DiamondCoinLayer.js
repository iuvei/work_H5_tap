/**
 * Created by WhelaJoy on 2017/1/6.
 */
var DiamondCoinLayer = (function(_super){
    function DiamondCoinLayer(){
        DiamondCoinLayer.super(this);
        this._fallList = [];
        this.init();
    }
    Laya.class(DiamondCoinLayer,"DiamondCoinLayer",_super);
    var _proto = DiamondCoinLayer.prototype;
    _proto.init = function (){
        Laya.timer.frameLoop(1, this, this.update);
    };

    //钻石
    _proto.addDiamond = function(coinInfo,startPos,speed){
        if(!startPos)
            startPos = Point.p(320,Math.random()* 5 + 500);     //钻石初始的坐标
        if(!speed){
            //speed =	{x:300 - Math.random()*600,y:500 + Math.random()*500};
            speed =	{x:0,y:0};
        }

        var endPos = Point.p(0, 600);                           //钻石掉落的Y坐标（设置最低点）
        var dropInfo = new DropInfo(coinInfo,startPos,endPos);
        dropInfo.speed = speed;
        dropInfo.collectPos = App.getRunView().getDiamondPos();       //钻石效果，移动到最终的目标坐标
        dropInfo.startPos = startPos;



        //if(!startPos)
        //    startPos = Point.p(Math.random()* 100 - 50,Math.random()* 50 + 200);
        //if(!speed){
        //    speed =	{x:0,y:0};
        //}
        //
        //var endPos = Point.p(Math.random()* 300*2 - 300, 0);
        //var info = new DropInfo(CategoryType.DIAMOND,num,startPos,endPos);
        //info.speed = speed;
        //info.collectPos = GlobalData.diamondPos;
        ////var player = GlobalData.getPlayerData();
        ////player.addSaveInfoByType(info.getCount(), CategoryType.DIAMOND);

        var item = new CoinBox(dropInfo);
        this.addChild(item);
        item.pos(startPos.x,startPos.y);
        item.doFallAction();

        this._fallList.push(item);
    };

    //荣誉
    _proto.addRelics = function(coinInfo,startPos,speed){

        if(!startPos)
            startPos = Point.p(320,Math.random()* 5 + 500);     //荣誉初始的坐标
        if(!speed){
            //speed =	{x:300 - Math.random()*600,y:500 + Math.random()*500};
            speed =	{x:0,y:0};
        }

        var endPos = Point.p(0, 600);                           //荣誉掉落的Y坐标（设置最低点）
        var dropInfo = new DropInfo(coinInfo,startPos,endPos);
        dropInfo.speed = speed;
        dropInfo.collectPos = App.getRunView().getRelicsPos();       //荣誉效果，移动到最终的目标坐标
        dropInfo.startPos = startPos;


        //if(!startPos)
        //    startPos = Point.p(Math.random()* 100 - 50,Math.random()* 50 + 200);
        //if(!speed){
        //    speed =	{x:0,y:0};
        //}
        //
        //var endPos = Point.p(Math.random()* 300*2 - 300, 0);
        //var info = new DropInfo(CategoryType.ARTIFACT,num,startPos,endPos);
        //info.speed = speed;
        //info.collectPos = GlobalData.artifactPos;
        //var player = GlobalData.getPlayerData();
        //player.addSaveInfoByType(info.getCount(), CategoryType.ARTIFACT);

        var item = new CoinBox(dropInfo);
        this.addChild(item);
        item.pos(startPos.x,startPos.y);
        item.doFallAction();

        this._fallList.push(item);
    };
    //物品
    _proto.addItem = function(num,startPos,speed,type, endPos ,collectPos){
        if(!startPos)
            startPos = Point.p(Math.random()* 100 - 50,Math.random()* 50 + 200);
        if(!speed){
            speed =	{x:0,y:0};
        }

        var endPos = endPos || Point.p(Math.random()* 300*2 - 300, 0);
        var info = new DropInfo(type,num,startPos,endPos);
        info.speed = speed;

        if(type)
            info.collectPos = collectPos || GlobalData.artifactPos;
        else
            info.collectPos = collectPos || Point.p(0,0);

        var item = new CoinBox(info);
        this.addChild(item);
        item.pos(startPos.x,startPos.y);
        item.doFallAction();

        this._fallList.push(item);
        return item;
    };

    _proto.update = function(){
        var dt = Laya.timer.delta/1000;
        for(var i=0;i<this._fallList.length;){
            var fallItem = this._fallList[i];
            fallItem.update(dt);
            if(fallItem.isFinished()){
                this.removeChild(fallItem);
                this._fallList.splice(i,1);
            }else{
                ++i;
            }
        }
    };

    _proto.dispose = function(){
        this.removeSelf();
    };
    return DiamondCoinLayer
})(Laya.Sprite);