/**
 * Created by WhelaJoy on 2017/1/14.
 */
var CategoryType = {
    COPPER:1,
    DIAMOND:2,
    ARTIFACT_POINT:3,//神器点(BOSS掉落)
    NOSCENEDIAMOND:4,
    ARTIFACT:5,		 //神器点(转生掉落)
};

var DropInfo = (function(_super){
    function DropInfo(coinInfo,startPos,endPos){
        DropInfo.super(this);
        this.init(coinInfo,startPos,endPos);
    }
    Laya.class(DropInfo,"DropInfo",_super);
    var _proto = DropInfo.prototype;
    _proto.init = function(coinInfo,startPos,endPos){
        this._type = coinInfo.type;
        this._coinInfo = coinInfo;
        var count = coinInfo.amount;
        if(this._type ==  Game.Coin.TYPE_GOLD){
            //this._count = count || Narwhale.Config.formatNumber(count);
            this._count = count ;
        }
        //else if(this._type == CategoryType.NOSCENEDIAMOND){
        //    this._count = count || 0;
        //}
        else{
            this._count = count || 1;
        }
        this._startPos = startPos;
        var endPos = endPos;
        this._endPos = endPos;
        this._ctrlPos = Point.p((this._startPos.x + this._endPos.x)/2,this._startPos.y + 300 + 100*Math.random());

        if(endPos.x > 0){
            this._endPos2 = Point.p(endPos.x - 20,endPos.y);
            this._ctrlPos3 = Point.p(this._endPos2.x + 200,200);
        }
        else{
            this._endPos2 = Point.p(endPos.x + 20,endPos.y);
            this._ctrlPos3 = Point.p(this._endPos2.x - 200,200);
        }

        this._ctrlPos2 = Point.p((this._endPos.x + this._endPos2.x)/2,50);

        this._dropTime = Math.abs(this._startPos.y - this._endPos.y)/150;
    };

    _proto.getDropTime = function(){
        return this._dropTime;
    };

    _proto.getEndPos = function(){
        return this._endPos;
    };

    _proto.getEndPos2 = function(){
        return this._endPos2;
    };

    _proto.getCount = function(){
        return this._count;
    };

    _proto.getType = function(){
        return this._endPos2;
    };

    _proto.getCoinInfo = function(){
        return this._coinInfo;
    };

    _proto.getDuration = function(){
        return this._coinInfo.getDuration();
    };

    _proto.getIconPath = function(){
        if(this._type == Game.Coin.TYPE_GOLD){
            return "assets/ui.common/money_copper_1.png";

        }else if(this._type == Game.Coin.TYPE_DIAMOND){
            return "assets/ui.common/money_diamond_2.png";

        }else if(this._type == Game.Coin.TYPE_RELICS){
            return "assets/ui.common/artifactIcon_2.png";
        }
    };

    _proto.parserInfo = function(){
        var player = App.player;

        if(this._type == Game.Coin.TYPE_GOLD){
            return "";

        }else if(this._type == Game.Coin.TYPE_DIAMOND){
            return "";

        }else if(this._type == Game.Coin.TYPE_RELICS){
            return "";
        }

        //if(this._type == CategoryType.COPPER){
        //    //player.addCopper(this._count);
        //}else if(this._type == CategoryType.DIAMOND){
        //    //player.addDiamond(this._count,false,LLS("GD_DROP"));
        //
        //}else if(this._type == CategoryType.ARTIFACT){
        //    //player.addArtifactPoint(this._count,false,LLS("GD_DROP"));
        //
        //}else if(this._type == CategoryType.ARTIFACT_POINT){
        //    //player.addArtifactPoint(this._count,false,LLS("GD_DROP"));
        //}
        //if(this._type != CategoryType.COPPER){
        //    //var player = App.player
        //    //player.reduceSaveInfoByType(this.getCount(),  this._type);
        //}
    };
    return DropInfo
})(Laya.EventDispatcher);