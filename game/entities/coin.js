(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Coin = root.Coin = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this.type                = opts.type || 0;
        this.amount              = opts.amount || 0;
        this.duration            = opts.duration || 5000;       //五秒之后自动拾取
    };

    root.inherits(Coin, _super);

    root.extend(Coin.prototype, root.Interface);

    root.extend(Coin.prototype, {
        getAmount: function() {
            return this.amount || 0;
        },

        getDuration: function() {
            return this.duration;
        },

        isGold: function() {
            return this.type == Coin.TYPE_GOLD;
        },

        isDiamond: function() {
            return this.type == Coin.TYPE_DIAMOND;
        },

        isRelics: function() {
            return this.type == Coin.TYPE_RELICS;
        },

        getType: function() {
            return this.type;
        }
    });

    Coin.TYPE_GOLD = 0;
    Coin.TYPE_DIAMOND = 1;
    Coin.TYPE_RELICS = 2;

    Coin.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;

        return new Coin(data);
    };

    Coin.load = function(opts, player) {
        opts = opts || {};

        return {};
    };
}(hGame006));