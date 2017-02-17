(function(root) {
    var _super = root.Serialize;

    var Game= root.Game;

    var Hero = root.Hero = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._multiplier         = 0;
        this._name               = this._db.name;

        this.id                  = opts.id || this._db.id;
        this.level               = opts.level || 0;
        this.weapon              = opts.weapon || 0;
        this.soul                = opts.soul || 0;
        this.star                = opts.star || 0;
        this.deadCD              = opts.deadCD || 0;
        this.realDPS             = opts.realDPS || 0;
        this.skillBought         = opts.skillBought || [false, false, false, false, false, false, false];
    };

    root.inherits(Hero, _super);

    root.extend(Hero.prototype, root.Interface);

    root.extend(Hero.prototype, {
        active: function() {
            var nowTime = Number(root.moment().format("X"));

            return this.level > 0 && this.deadCD < nowTime;
        },

        reset: function() {
            this.level = 0;
            this.deadCD = 0;
            this.realDPS = 0;
            this.skillBought = [false, false, false, false, false, false, false];
        },

        getLevel: function() {
            return this.level;
        },

        getDB: function() {
            return this._db;
        },

        getName: function() {
            return this._name;
        },

        //计算level级的战斗力
        calcDPS: function(level) {
            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();
            level = level || 1;

            var baseCost = +(this._db.cost);
            var evolved = level > 1000;
            var heroID = +this.id - 1000;

            var A = baseCost * (evolved ? 10 : 1) * Math.pow(1.075, level - 1);
            var B = Math.pow(1.075, evolved ? level - 1000 : level) - 1;
            var C = Math.pow(0.904, evolved ? level - 1001 : level - 1) * Math.pow(1 - (0.019 * (evolved ? 15 : Math.min(heroID + 1, 15))), heroID + 1 + (evolved ? 30 : 0));

            var multiplier = 0;
            var heroDamage = A * (B * C) / 0.75;

            // 技能自身伤害系数
            multiplier += this._multiplier;
            // 技能所有攻击伤害系数
            multiplier += heroValues.allDamage;

            // 英雄技能叠加效果
            heroDamage *= (1 + multiplier);

            // 英雄武器叠加效果
            heroDamage *= (1 + 0.5 * this.weapon);

            // 武器套装叠加效果
            if (this._player.weaponSets > 0) {
                heroDamage *= 10 * this._player.weaponSets;
            }

            // 神器叠加效果
            heroDamage *= (1 + artifactValues.allDamage);

            // 星级叠加效果
            heroDamage *= Math.pow(2, this.star || 0);

            return Math.ceil(heroDamage);
        },

        getDPS: function() {
            var level = this.level || 1;

            this.realDPS = this.calcDPS(level);
            return this.realDPS;
        },

        getReviveCost: function() {
            var nowTime = Number(root.moment().format("X"));
            var leftTime = this.deadCD - nowTime;

            if (leftTime < 0) {
                return 0;
            }

            //5分钟一钻石
            var cost = Math.ceil(leftTime / 300);
            if (cost < 0) {
                cost = 0;
            }
            return cost;
        },

        getBaseCost: function(level) {
            return +(this.getDB().cost) * Math.pow(1.075, level);
        },

        getCost: function(level) {
            var cost = this.getBaseCost(level);
            var artifactValues = this.getArtifactValues();

            // 进化之后要*10
            if (this.level > 1000) {
                cost *= 10;
            }

            cost *= (1 + artifactValues.upgradeCost);

            return Math.ceil(cost);
        },

        calcUpgradeCost: function(level) {
            //这里算出的付款量已经包含神器效果
            var cost = 0;
            for (var i = this.level; i < this.level + level; i++) {
                cost += this.getCost(i);
            }

            return cost;
        },

        mostUpgrade: function(level) {
            level = level || 1;
            var tmp = this.level % level;
            if (tmp > 0) {
                level = level - tmp;
            }

            var cost = 0;
            for (var i = 0; i < level; i++) {
                var lv = this.level + i;
                cost += this.getCost(lv);

                if (this.level < 1000 && lv >= 1000) {
                    return i;
                }

                if (!this.isGoldEnough(cost)) {
                    return i;
                }
            }

            return level;
        },

        canUpgradeLevel: function(level) {
            level = level || 1;

            if (this.level < 1000 && this.level + level > 1000) {
                level = 1000 - this.level;
            }

            return level;
        },

        upgrade: function(level) {
            level = level || 1;

            if (this.level == 1000) {
                return false;
            }

            level = this.canUpgradeLevel(level);

            //等级提升
            this.level += level;

            //调用总的计算
            this.updateTitans();

            return true;
        },

        skillUpgradeCondition: function(skillIndex) {
            if (this.skillBought[skillIndex] == null) {
                return root.Code.GAME_ERR.WRONG_SKILL;
            }

            if (this.skillBought[skillIndex]) {
                return root.Code.GAME_ERR.ALREADY_LEARN;
            }

            if (this.level <= 1000) {
                if (this.level < Game.SKILL_AT_LEVEL[skillIndex]) {
                    return root.Code.GAME_ERR.NOT_ENOUGH_LEVEL;
                }
            }
            else {
                if (this.level < Game.SKILL_AT_LEVEL[skillIndex] + 1000) {
                    return root.Code.GAME_ERR.NOT_ENOUGH_LEVEL;
                }
            }

            for (var i = 0; i < skillIndex; i++) {
                if (this.skillBought[i] == false) {
                    return root.Code.GAME_ERR.WRONG_SKILL;
                }
            }

            return null;
        },

        upgradeSkill: function(skillIndex) {
            this.skillBought[skillIndex] = true;

            this.updateHeroValues();
            this.updateTitans();

            return true;
        },

        upgradeWeapon: function() {
            if (!this.isWeaponEnough(1)) {
                return false;
            }

            this.weapon++;
            this.decreaseWeapon(1);

            var minSets = this.weapon;
            for(var i = 0; i < this.MAX_HERO; i++)
            {
                var hero = this.getHero(i);
                minSets = Math.min(minSets, hero.weapon);
            }
            this.weaponSets = minSets;

            this.updateTitans();

            return true;
        },

        doEvolution: function() {
            if (this.level != 1000) {
                return false;
            }

            this.level++;
            this.skillBought = [false, false, false, false, false, false, false];

            this.updateHeroValues();
            this.updateTitans();

            return true;
        },

        die: function(time) {
            var nowTime = Number(root.moment().format("X"));
            this.deadCD = time + nowTime;
        },

        revive: function() {
            this.deadCD = 0;
        },

        getSkillString: function(skillIndex) {

        },

        getSkillCost: function(skillIndex) {
            if (skillIndex < 0 || skillIndex > 6) {
                return -1;
            }
            var fitLevel = Game.SKILL_AT_LEVEL[skillIndex];

            //英雄转生后
            if ((this.level - 1) > 1000) {
                fitLevel += 1000;
            }
            var baseCost = this.getBaseCost(fitLevel);

            //五倍的原始消耗
            return 5*Math.ceil(baseCost);
        },

        getSkillType: function(skillIndex) {
            return this.getDB().skillType[skillIndex];
        },

        getSkillEffect: function(skillIndex) {
            if (this.skillBought[skillIndex] == true) {
                return this.getDB().skillValue[skillIndex];
            }

            return 0;
        },

        getFreq: function() {
            var skillEffect = 1;
            var warCry = this._player.skills["warCry"];
            if (warCry.isRunning()) {
                var rate = warCry.getEffect();
                skillEffect = 1 + rate;
                if (skillEffect == 0) {
                    skillEffect = 1;
                }
            }
            return this._db.freq / skillEffect;
        },

        // ----------------------- hero actions --------------
        //英雄攻击怪物
        hit: function() {
            var rate = this._db.freq / 1000;
            var damage = Math.ceil(this.realDPS * rate);

            this.getStage().hurtMonster(damage, root.Stage.HURT_HERO, this);

            return {damage: damage};
        },

        syncHero: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var needUpTitan = false;
            var i;
            var value;
            opts = opts || {};

            if (opts.upgrade != null) {
                value = parseInt(opts.upgrade);
                self.upgrade(value);
                self.event(Hero.LEVELCHANGE, self);
            }

            if (opts.evolution) {
                self.doEvolution();
                self.event(Hero.EVOLVE, self);
            }

            if (opts.skill != null) {
                value = parseInt(opts.skill);
                self.upgradeSkill(value);
                self.event(Hero.SKILLUPGRADE, self);
            }

            if (opts.die != null) {
                value = parseInt(opts.die);
                self.die(value);
                self.event(Hero.DEAD, self);
                needUpTitan = true;
            }

            if (opts.revive) {
                self.revive();
                self.event(Hero.REVIVED, self);
                needUpTitan = true;
            }

            if (opts.reset != null) {
                self.reset();
                self.event(Hero.RESET, self);
            }

            if (needUpTitan) {
                this.updateTitans();
            }
        }
    });

    Hero.LEVELCHANGE        = "hero.level.change";
    Hero.SKILLUPGRADE       = "hero.skill.upgrade";
    Hero.EVOLVE             = "hero.evolution";
    Hero.RESET              = "hero.reset";
    Hero.DEAD               = "hero.dead";
    Hero.REVIVED            = "hero.revived";

    Hero.create = function(opts, player) {
        opts = opts || {};

        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.HERO_LIST[data.index];

        return new Hero(data);
    };

    Hero.load = function(opts, player) {
        opts = opts || [];

        var arr = [];
        for (var i = 0; i < Game.MAX_HERO; i++) {
            var data = opts[i] || {};
            data.index = i;

            var hero = Hero.create(data, player);

            arr.push(hero);
        }

        return arr;
    };
}(hGame006));