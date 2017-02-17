(function(root) {
    var _super = root.Serialize;

    var Game = root.Game;
    var Skill = root.Skill = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._name               = this._db.name;

        this.id                  = opts.id || this._db.id;
        this.level               = opts.level || 0;
        this.availableTime       = opts.availableTime || 0;
        this.durationTime        = opts.durationTime || 0;
    };

    root.inherits(Skill, _super);

    root.extend(Skill.prototype, root.Interface);

    root.extend(Skill.prototype, {
        active: function() {
            return this.level > 0;
        },

        reset: function() {
            this.level = 0;
            this.availableTime = 0;
            this.durationTime = 0;
        },

        getName: function() {
            return this._name;
        },

        getLevel: function() {
            return this.level;
        },

        getDurationTime: function() {
            return this.durationTime;
        },

        getCost: function() {
            var artifactValues = this.getArtifactValues();

            var cost = this._db.cost(this.level);

            cost = Math.pow(1.075, cost) * 75;
            cost *= (1 + artifactValues.upgradeCost);

            return Math.ceil(cost);
        },

        getDuration: function() {
            var artifactValues = this.getArtifactValues();
            return Math.ceil(this._db.duration * (1 + artifactValues[this._db.dtArtifact]));
        },

        getCoolDown: function() {
            var artifactValues = this.getArtifactValues();
            return Math.ceil(this._db.cd * (1 + artifactValues[this._db.cdArtifact]));
        },

        getEffect: function() {
            return this._db.effect(this.level);
        },

        getEffectDesc: function () {
            var effect = this.getEffect();
            return this._db.effectDesc(effect);
        },

        getStartLevel: function() {
            return this._db.startLevel;
        },

        upgrade: function() {
            this.level++;

            return true;
        },

        isRunning: function() {
            var nowTime = Number(root.moment().format("X"));

            return (this.level > 0) && (this.durationTime > nowTime);
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

        castCheck: function() {
            if (this.level <= 0) {
                return root.Code.GAME_ERR.NOT_ENOUGH_LEVEL;
            }

            if (this.getAvailable() != 0) {
                return root.Code.GAME_ERR.SKILL_IS_ON_CD;
            }

            return null;
        },

        syncSkill: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var i;
            var value;
            var array;

            opts = opts || {};

            if (opts.upgrade != null) {
                self.upgrade();
                self.event(Skill.LEVELCHANGE, self);
            }

            if (typeof opts.cast == "object") {
                array = opts.cast;
                //精灵获得的技能不会设置cd
                if (array.availableTime != null) {
                    value = parseInt(array.availableTime);
                    self.availableTime = value;
                }
                value = parseInt(array.durationTime);
                self.durationTime = value;
                self.event(Skill.CAST, self);
            }

            if (opts.refresh != null) {
                self.availableTime = 0;
                self.event(Skill.RESET, self);
            }

            if (opts.reset != null) {
                self.reset();
                self.event(Skill.RESET, self);
            }
        }
    });

    Skill.LEVELCHANGE       = "skill.level.change";
    Skill.CAST              = "skill.cast";
    Skill.RESET             = "skill.reset";
    Skill.REFRESH           = "skill.refresh";

    Skill.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.SKILL_LIST[data.key];

        return new Skill(data);
    };

    Skill.load = function(opts, player) {
        opts = opts || {};

        var skills = {};

        for (var name in Game.SKILL_LIST) {
            var data = opts[name] || {};
            data.key = name;

            skills[name] = Skill.create(data, player);
        }

        return skills;
    };
}(hGame006));