/**
 * Created by WhelaJoy on 2017/1/13.
 */
var DiamondBox = (function(_super) {
    function DiamondBox() {
        DiamondBox.super(this);
    }

    Laya.class(DiamondBox, "DiamondBox", _super);

    DiamondBox.prototype.onRender = function(data) {

    };

    DiamondBox.renderHandler = function(cell, index) {
        cell.onRender(cell.dataSource);
    };

    return DiamondBox;
}(DiamondBoxUI));