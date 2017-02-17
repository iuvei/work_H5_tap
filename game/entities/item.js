(function(root) {
    var _super = root.Serialize;

    var Game = root.Game;
    var Item = root.Item = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._name               = this._db.name;

        this.key                 = opts.key;
        this.id                  = opts.id || this._db.id;
        this.count               = opts.count || 0;
        this.availableTime       = opts.availableTime || 0;
        this.durationTime        = opts.durationTime || 0;
    };

    root.inherits(Item, _super);

    root.extend(Item.prototype, root.Interface);

    root.extend(Item.prototype, {
        getName: function() {
            return this._name;
        },

        getCost: function() {
            return this._db.cost;
        },

        getDuration: function() {
            var power = 0;
            if (this.key == "holding") {
                var artifactValues = this.getArtifactValues();
                power = artifactValues.powerOfHoldingDuration;
            }

            return Math.floor(this._db.duration * (1 + power));
        },

        getCoolDown: function() {
            return this._db.cd;
        },

        getEffect: function() {
            var stage = this.getStage();

            switch (this.key) {
                case "storm": {
                    var gold = 1000;
                    if (stage.baseGold) {
                        gold = stage.baseGold * 2000;
                    }

                    return gold;
                }
                case "doom": {
                    return stage.bossHealth * 10;
                }
                case "holding": {
                    return 30;
                }
                case "shield":
                case "refresh": {
                    return this.getDuration();
                }
            }
        },

        getDurationTime: function() {
            return this.durationTime;
        },

        isRunning: function() {
            var nowTime = Number(root.moment().format("X"));

            return this.durationTime > nowTime;
        },

        //获取还要多少秒才能使用该技能 返回0为cd完成可以使用
        getAvailable: function(nowTime) {
            nowTime = nowTime || Number(root.moment().format("X"));

            if (this.availableTime <= 0) {
                return 0;
            }

            var leftTime = this.availableTime - nowTime;
            if (leftTime <= 0) {
                return 0;
            }
            return leftTime;
        },

        getDesc: function() {
            var desc = "花费" + this.getCost() + "钻石，";

            switch (this.key) {
                case "storm": {
                    var gold = this.getEffect();

                    desc += ("获得黄金" + Game.formatNumber(gold));
                    break;
                }
                case "doom": {
                    desc += "秒杀当前怪物";
                    break;
                }
                case "holding": {
                    var effect = this.getEffect();
                    var duration = this.getDuration();

                    desc += ("让你每秒点击" + effect + "下，效果持续" + duration + "秒");
                    break;
                }
                case "shield": {
                    desc += "所有英雄获得24小时免疫死亡效果";
                    break;
                }
                case "refresh": {
                    desc += "重置所有主角技能冷却时间";
                    break;
                }
            }

            return desc;
        },

        increase: function(amount) {
            var count = this.count;
            if (count < 0) {
                count = 0;
            }
            count += Math.abs(amount);
            this.count = count;
        },

        decrease: function(amount) {
            var count = this.count;
            count -= Math.abs(amount);
            if (count < 0) {
                count = 0;
            }
            this.count = count;
        },

        getCount: function() {
            return this.count;
        },

        syncItem: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var i;
            var value;
            var array;

            opts = opts || {};

            if (opts.count != null) {
                value = +opts.count;
                if (value < 0) {
                    self.decrease(value);
                    self.event(Item.UPDATECOUNT, self);
                }
                else if (value > 0) {
                    self.increase(value);
                    self.event(Item.UPDATECOUNT, self);
                }
            }

            if (typeof opts.cast == "object") {
                array = opts.cast;
                value = parseInt(array.availableTime);
                self.availableTime = value;
                value = parseInt(array.durationTime);
                self.durationTime = value;
                self.event(Item.CAST, self);
            }
        }
    });

    Item.CAST               = "item.cast";
    Item.UPDATECOUNT        = "item.update.count";

    Item.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.ITEM_LIST[data.key];

        return new Item(data);
    };

    Item.load = function(opts, player) {
        opts = opts || {};

        var items = {};

        for (var key in Game.ITEM_LIST) {
            var data = opts[key] || {};
            data.key = key;

            items[key] = Item.create(data, player);
        }

        return items;
    };
}(hGame006));