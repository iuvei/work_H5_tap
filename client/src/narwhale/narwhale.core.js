var window = window || global;

var Nawhale = window.Narwhale = (function(root) {
    var Nawhale = {
        designWidth: 640,
        designHeight: 1136,
        resource: {}
    };

    return Nawhale;
}(window));

(function(root) {
    var Event = Narwhale.Event = (function() {
        function Event() {}

        // class init events
        Event.INITED = "inited";
        Event.STARTED = "started";

        // loader work flow
        Event.LOADING = "loading";
        Event.PROGRESS = "progress";
        Event.LOADED = "loaded";

        // 战斗界面显示
        Event.Battle = {
            CREATEHERO : "createHero",              //创建英雄
            CREATEHEROITEM : "createHeroItem",      //创建英雄Item
            UPDATEHEROITEM : "updateHeroItem",      //更新英雄Item
            CHECKOFFLINEGOLD : "checkoffLineGold",  //检测离线金币
            ADDNUMCOIN : "addNumCoin",              //添加资源（货币）数值显示
            ADDAWARDBOX : "addAwardBox",            //添加精灵奖励宝箱显示
            ADDFAIRYCOIN : "addFairyCoin",          //添加精灵奖励（货币）显示
        };

        return Event;
    }());
}(Narwhale));