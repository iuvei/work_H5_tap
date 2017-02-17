var DpsTab = (function(_super) {
    function DpsTab(matrix) {
        DpsTab.super(this);

        this.labelMatrix = matrix;
        this.labelList = {};

        this.init();
    }

    Laya.class(DpsTab, "DpsTab", _super);

    DpsTab.prototype.init = function() {
        for (var index = DpsTab.LABEL_START; index < DpsTab.LABEL_TOTAL; index++) {
            var label = this.labelMatrix[index];
            var labelName = label[DpsTab.LABEL_NAME_INDEX];
            this.labelList[labelName] = label[DpsTab.LABEL_SPIRITE_INDEX];
        }
    };

    DpsTab.prototype.initEvent = function () {
        var player = App.player;
        var hero = player.heros;
        player.on(Game.Player.LEVELCHANGE, this, this.updateTapDps);
        for (var index in hero) {
            hero[index].on(Game.Hero.LEVELCHANGE, this, this.updateHeroDps);
        }
    };

    DpsTab.prototype.initValueShow = function () {
        this.initEvent();
        this.updateCurrentDps();
        this.updateHeroDps();
        this.updateTapDps();
    };

    DpsTab.prototype.updateCurrentDps = function () {};

    DpsTab.prototype.updateTapDps = function () {
        var player = App.player;
        var tapDamage = player.gameValues.tapDamage;
        var tapDamageStr = Narwhale.Config.formatNumber(tapDamage);
        this.labelList[DpsTab.LABEL_LIST.tapDPSLabel].text = tapDamageStr;
    };

    DpsTab.prototype.updateHeroDps = function () {
        var heroObj = App.player.heros;
        var dpsSum = 0;
        var dpsSumStr = "";
        for (var index in heroObj) {
            var heroInfo = heroObj[index];

            if (heroInfo.level > 0) {
                dpsSum += heroInfo.getDPS();
            }
        }
        dpsSumStr = Narwhale.Config.formatNumber(dpsSum);
        this.labelList[DpsTab.LABEL_LIST.heroDPSLabel].text = dpsSumStr;
    };

    DpsTab.LABEL_START = 0;
    DpsTab.LABEL_TOTAL = 3;

    DpsTab.LABEL_SPIRITE_INDEX = 0;
    DpsTab.LABEL_NAME_INDEX = 1;

    DpsTab.LABEL_LIST = {
        currentDPSLabel: "currentDPSLabel",
        tapDPSLabel: "tapDPSLabel",
        heroDPSLabel: "heroDPSLabel"
    };

    return DpsTab;
}(laya.events.EventDispatcher));