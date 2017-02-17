(function(root) {
    var _super = root.Serialize;

    var Game= root.Game;
    var Monster = root.Monster;
    var Stage = root.Stage = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = Game.STAGE_LIST;
        this._monster            = null;
        this._monsterInfo        = null;

        this.mobCount            = opts.mobCount || 10;
        this.highLevel           = opts.highLevel || 1;

        this.level               = opts.level || 1;
        this.progress            = opts.progress || 0;
        this.paused              = opts.paused || false;        //暂停不打boss(离开战斗状态)

        this.mobHealth           = opts.mobHealth || 30;
        this.bossHealth          = opts.bossHealth || 60;

        this.baseGold            = opts.baseGold || 1;
        this.baseMobGold         = opts.baseMobGold || 1;
        this.baseBossGold        = opts.baseBossGold || 1;
        this.baseChestGold       = opts.baseChestGold || 10;

        this.mobGold             = opts.mobGold || 1;
        this.bossGold            = opts.bossGold || 1;
        this.chestGold           = opts.chestGold || 10;
        this.offlineGold         = opts.offlineGold || 1;

        this.chestChance         = opts.chestChance || 0.02;

        this.mobSize             = opts.mobSize || 0.6;
        this.bossSize            = opts.bossSize || 1.2;

        this.init();
    };

    root.inherits(Stage, _super);

    root.extend(Stage.prototype, root.Interface);

    root.extend(Stage.prototype, {
        init: function() {
        },

        reset: function(opts) {
            opts = opts || {};

            this.level               = opts.level || 1;
            this.baseGold            = opts.baseGold || 1;
            this.mobHealth           = opts.mobHealth || 30;
            this.baseMobGold         = opts.baseMobGold || 1;
            this.mobGold             = opts.mobGold || 1;
            this.offlineGold         = opts.offlineGold || 1;
            this.bossHealth          = opts.bossHealth || 60;
            this.baseBossGold        = opts.baseBossGold || 1;
            this.bossGold            = opts.bossGold || 1;
            this.chestChance         = opts.chestChance || 0.02;
            this.baseChestGold       = opts.baseChestGold || 10;
            this.chestGold           = opts.chestGold || 10;
            this.mobSize             = opts.mobSize || 0.6;
            this.bossSize            = opts.bossSize || 1.2;
            this.progress            = opts.progress || 0;
            this.mobCount            = opts.mobCount || 10;

            //关掉暂停按钮
            this.paused              = false;
        },

        calculate: function(stage) {
            var info = {};

            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();

            var rmbMultiple = 1;
            var goldMultiple = (1 + heroValues.goldAmount + artifactValues.goldCollection);
            var baseHealth = 18.5 * Math.pow(1.57, Math.min(stage, 156)) * Math.pow(1.17, Math.max(stage - 156, 0));
            var baseGold = baseHealth * (0.02 + (0.00045 * Math.min(stage, 150)));

            info.mobHealth = baseHealth;
            info.bossHealth = baseHealth * Game.BOSS_MULTIPLIER[(stage-1)%5] * (1 + artifactValues.bossLife);

            if (stage <= 80) {
                info.bossHealth *= 0.5;
                if (info.bossHealth < 1) {
                    info.bossHealth = 1;
                }
                info.mobHealth *= 0.5;
                if (info.mobHealth < 1) {
                    info.mobHealth = 1;
                }
            }

            info.bossHealth = Math.ceil(info.bossHealth);
            info.mobHealth = Math.ceil(info.mobHealth);
            info.baseGold = Math.ceil(baseGold);

            info.baseMobGold = Math.ceil(baseGold * goldMultiple);
            //info.mobGold = info.baseMobGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("valrunes") + this._player.getArtifactEffect("elixir"));
            info.mobGold = info.baseMobGold
                * (1 + artifactValues.mobGold)
                * (1 + artifactValues.goldPlaying);
            info.mobGold = Math.ceil(info.mobGold * rmbMultiple) ;

            //狡诈护符的金币 与mobGold区别在于没有在线金币加成elixir 和 英雄加成
            //info.rbMobGold = Math.ceil(baseGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("valrunes")) * rmbMultiple);
            info.rbMobGold = Math.ceil(baseGold
                * (1 + artifactValues.goldCollection)
                * (1 + artifactValues.mobGold)
                * rmbMultiple);
            //与mobGold区别在于没有在线金币加成elixir
            //info.offlineGold = info.baseMobGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("valrunes"));
            info.offlineGold = info.baseMobGold * (1 + artifactValues.mobGold);

            info.baseBossGold = baseGold * Game.BOSS_MULTIPLIER[(stage-1) % 5];
            info.baseBossGold = Math.ceil(info.baseBossGold * goldMultiple);
            //info.bossGold = info.baseBossGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("shield") + this._player.getArtifactEffect("elixir"));
            info.bossGold = info.baseBossGold
                * (1 + artifactValues.bossGold)
                * (1 + artifactValues.goldPlaying);
            info.bossGold = Math.ceil(info.bossGold * rmbMultiple);

            //info.baseChestGold = Math.ceil(10 * baseGold * (1 + this._player.values.heroAura["goldAmount"] + this._player.values.heroAura["chestGold"]));
            info.baseChestGold = Math.ceil(10 * baseGold * goldMultiple);
            //info.chestGold = info.baseChestGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("contentment") + this._player.getArtifactEffect("elixir"));
            info.chestGold = info.baseChestGold
                * (1 + heroValues.chestGold)
                * (1 + artifactValues.chestGold)
                * (1 + artifactValues.goldPlaying);
            info.chestGold = Math.ceil(info.chestGold * rmbMultiple);

            info.chestChance = 0.02 * (1 + artifactValues.chestChance);

            info.mobSize = 1 + Math.floor(stage/50) * 0.018;
            if (info.mobSize > 1.5) {
                info.mobSize = 1.5;
            }

            info.bossSize = 1.2 + Math.floor(stage/50) * 0.03;
            if (info.bossSize > 1.8) {
                info.bossSize = 1.8;
            }

            return info;
        },

        update: function(stage) {
            stage = stage || this.level;
            if (stage < 1) {
                stage = 1;
            }
            this.level = stage;
            this.highLevel = (this.highLevel < this.level) ? this.level : this.highLevel;

            var info = this.calculate(stage);

            this.baseGold       = info.baseGold;
            this.baseMobGold    = info.baseMobGold;
            this.baseBossGold   = info.baseBossGold;
            this.baseChestGold  = info.baseChestGold;

            this.mobHealth      = info.mobHealth;
            this.bossHealth     = info.bossHealth;

            this.mobGold        = info.mobGold;
            this.bossGold       = info.bossGold;
            this.chestGold      = info.chestGold;
            this.offlineGold    = info.offlineGold;

            this.chestChance    = info.chestChance;

            this.mobSize        = info.mobSize;
            this.bossSize       = info.bossSize;

            this.containers     = {};
        },

        challenge: function() {

        },

        makeMonster: function() {
            var opts = JSON.parse(JSON.stringify(this._monsterInfo));

            var mobId = opts.id || 10001;
            opts._player = this._player;
            opts._stage = this;
            opts._db = Game.MONSTER_LIST[mobId];

            this._monster = Monster.create(opts);
            this._monster.on(Monster.DEAD, this, this.onMobDead);
            //console.log("[ debug ] make monster: " + JSON.stringify(this._monster.clone()));
        },

        process: function() {
            var result = {};

            //如果是暂停状态 不会处理进度
            if (this.progress >= this.mobCount) {
                if (!this.paused) {
                    result.level = this.level + 1;
                    result.progress = 0;
                }
            }
            else {
                result.progress = this.progress + 1;
                if (this.paused) {
                    result.paused = false;
                }
            }

            return result;
        },

        hurtMonster: function(damage, event, actor) {
            this._monster.hurtHealth(damage);
        },

        onMobDead: function(mob) {
        },

        getMonster: function(){
            return this._monster;
        },

        getPaused: function() {
            return this.paused;
        },

        getMobCount: function() {
            return this.mobCount;
        },

        getProgress: function() {
            return this.progress;
        },

        getLevel: function(){
            return this.level;
        },

        getBossTime: function() {
            var artifactValues = this.getArtifactValues();

            return Math.floor(30 * (1 + artifactValues.bossTime));
        },

        getMonsterSize: function() {
            if (this._monster.isBoss()) {
                return this.bossSize;
            }

            return this.mobSize;
        },

        //离线奖励数值，传入离线时长（秒），返回奖励值
        calcOfflineGold: function(offLineSecond) {
            var MAX_SECOND = 86400;
            var gameValues = this.getGameValues();
            //算法：离线时间内英雄可以挂机杀普通怪的数量*普通怪金币数
            var heroDamage = gameValues.heroDamage;
            if (heroDamage <= 0) {
                return 0;
            }
            var killNeedSecond = this.mobHealth / heroDamage;
            //小于1说明一秒可以杀多只怪，这样算他一秒杀1只
            if (killNeedSecond < 1) {
                killNeedSecond = 1;
            }
            killNeedSecond = Math.ceil(killNeedSecond);

            var killTimes = Math.floor(offLineSecond / killNeedSecond);
            //24小时内至少给他一只怪的奖励
            if (killTimes <= 0 && offLineSecond >= MAX_SECOND) {
                killTimes = 1;
            }
            //要除去游戏期间金币加量
            return Math.ceil(this.offlineGold * killTimes);
        },

        genMonster: function() {
            var opts = {};

            var stageLevel = this.getLevel();
            var stageDB = this._db[stageLevel%50 + 1];
            var mobId = 10001;
            //boss
            if (this.progress >= this.mobCount && this.paused == false) {
                mobId = stageDB.bossId;
                opts.id = mobId;

                opts.type = Monster.TYPE_BOSS;
                opts.health = this.bossHealth;
                opts.gold = this.bossGold;
                if (stageLevel > 50) {
                    var deadInfo = this.genHeroKillInfo(stageLevel);
                    if (deadInfo != null) {
                        opts.deadHero = deadInfo.heroId;
                        opts.deadTime = deadInfo.time;
                    }
                }
                //80关以后每10关获得一个荣誉
                if (stageLevel >= 80 && stageLevel % 10 == 0) {
                    opts.relics = 1;
                }
            }
            //普通怪
            else {
                var isChest = (Math.random() < this.chestChance);
                if (isChest) {
                    mobId = 10021;
                    opts.type = Monster.TYPE_CHEST;
                    opts.gold = this.chestGold;
                }
                else {
                    var i = Math.floor(Math.random() * stageDB.list.length);
                    mobId = stageDB.list[i];
                    opts.type = Monster.TYPE_MOB;
                    opts.gold = this.mobGold;
                }

                opts.id = mobId;
                opts.health = this.mobHealth;
            }

            return opts;
        },

        syncStage: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var i;
            var value;
            opts = opts || {};

            if (opts.monster != null) {
                value = opts.monster;
                self._monsterInfo = value;
            }

            if (opts.progress != null) {
                value = parseInt(opts.progress);
                self.progress = value;
                needEvent = true;
            }

            if (opts.level != null) {
                value = parseInt(opts.level);
                self.level = value;
                needUpdate = true;
                needEvent = true;
            }

            if (opts.paused != null) {
                value = opts.paused;
                self.paused = value;
                needEvent = true;
            }

            if (opts.reset != null) {
                value = opts.reset;
                self.reset(value);
                needUpdate = true;
                needEvent = true;
            }

            if (needUpdate) {
                self.update();
            }

            if (needEvent) {
                self.event(Stage.UP, self);
            }
        }
    });

    Stage.HURT_TAP = 1;
    Stage.HURT_HERO = 2;
    Stage.HURT_SHADOW = 3;
    Stage.HURT_HEAVENLY = 4;

    Stage.UP = "stage.update";

    Stage.create = function(opts, player) {
        opts = opts || {};

        opts._player = player;

        return new Stage(opts);
    };

    Stage.load = function(opts, player) {
        opts = opts || {};

        return Stage.create(opts, player);
    };
}(hGame006));