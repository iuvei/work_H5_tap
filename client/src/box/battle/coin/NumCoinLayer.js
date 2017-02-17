/**
 * Created by WhelaJoy on 2017/1/6.
 */
var NumCoinLayer = (function(_super){
    function NumCoinLayer(){
        NumCoinLayer.super(this);

    }
    Laya.class(NumCoinLayer,"NumCoinLayer",_super);
    var _proto = NumCoinLayer.prototype;
    _proto.addNumCoin = function(pos,num){
        num = Narwhale.Config.formatNumber(num);
        var numAction = NumAction.getCopperNum(num);
        if(numAction){
            numAction.pos(pos.x,pos.y - 20);
            this.addChild(numAction,100);
        }
    };
    return NumCoinLayer
})(Laya.Sprite);