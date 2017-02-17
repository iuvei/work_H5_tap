(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Fairy = root.Fairy = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this.type                = opts.type || 0;
        this.amount              = opts.amount || 0;
        this.duration            = opts.duration || 5000;       //五秒之后飞走
        this.autoCollect         = opts.autoCollect || false;   //是否会自动收集
    };

    root.inherits(Fairy, _super);

    root.extend(Fairy.prototype, root.Interface);

    root.extend(Fairy.prototype, {
        getAmount: function() {
            return this.amount || 0;
        },

        getDuration: function() {
            return this.duration;
        },

        getAutoCollect: function() {
            return this.autoCollect;
        },

        isSkill: function() {
            return (this.type == Fairy.TYPE_SHADOW_CLONE
                || this.type == Fairy.TYPE_CRITICAL_STRIKE
                || this.type == Fairy.TYPE_WAR_CRY
                || this.type == Fairy.TYPE_BERSERKER_RAGE
                || this.type == Fairy.TYPE_HAND_OF_MIDAS);
        },

        getType: function() {
            return this.type;
        }
    });

    Fairy.TYPE_GOLD             = "gold";
    Fairy.TYPE_DIAMOND          = "diamond";
    Fairy.TYPE_RELICS           = "relics";
    Fairy.TYPE_SHADOW_CLONE     = "shadowClone";
    Fairy.TYPE_CRITICAL_STRIKE  = "criticalStrike";
    Fairy.TYPE_WAR_CRY          = "warCry";
    Fairy.TYPE_BERSERKER_RAGE   = "berserkerRage";
    Fairy.TYPE_HAND_OF_MIDAS    = "handOfMidas";

    Fairy.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;

        return new Fairy(data);
    };

    Fairy.load = function(opts, player) {
        opts = opts || {};

        return {};
    };
}(hGame006));