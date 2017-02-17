(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Code = root.Code;
    var Stage = root.Stage;
    var Skill = root.Skill;
    var Hero = root.Hero;
    var Fairy = root.Fairy;
    var Item = root.Item;
    var Artifact = root.Artifact;
    var Achievement = root.Achievement;
    var Coin = root.Coin;
    var Player = root.Player = function(opts) {
        opts = opts || {};
        _super.call(this, opts);

        this._player            = this;
        this._db                = null;
        this._coins             = {};
        this._fairies            = {};
        this._fairyStamp        = 0;

        this.id                 = opts.id || 1;
        this.name               = opts.name || "强力MT";
        this.level              = opts.level || 1;
        this.location           = opts.location;
        this.lastLogin          = opts.lastLogin || 0;
        this.lastLogout         = opts.lastLogout || 0;
        this.offlineGold        = opts.offlineGold || 0;

        this.gold               = opts.gold || 0;
        this.diamond            = opts.diamond || 0;                                //钻石
        this.relics             = opts.relics || 0;                                 //荣誉
        this.weapons            = opts.weapons || 0;                                //武器点
        this.weaponSets         = opts.weaponSets || 0;

        //统计数据
        this.evoCount           = opts.evoCount || 0;                               //转生次数
        this.lastEvolution      = opts.lastEvolution || 0;                          //上次转身时间
        this.totalPlayTime      = opts.totalPlayTime || 0;                          //游戏总时间
        this.maxStage           = opts.maxStage || 1;                               //最高关卡

        //计算数据
        this.gameValues         = {};
        this.heroValues         = {};
        this.artifactValues     = {};

        // 游戏数据
        this.stage              = Stage.load(opts.stage, this);                     //关卡信息
        this.skills             = Skill.load(opts.skills, this);                    //技能信息
        this.items              = Item.load(opts.items, this);                      //物品信息
        this.heros              = Hero.load(opts.heros, this);                      //英雄信息
        this.artifacts          = Artifact.load(opts.artifacts, this);              //神器信息
        this.achievements       = Achievement.load(opts.achievements, this);        //成就信息

        this.init();
    };

    root.inherits(Player, _super);

    root.extend(Player.prototype, root.Interface);

    root.extend(Player.prototype, {
        init: function() {

            this.gameValues.criticalDamage = 10;        // 暴击伤害
            this.gameValues.bossCriticalDamage = 10;    // 魔王暴击伤害
            this.gameValues.criticalMultiplier = 10;    // 暴击系数
            this.gameValues.criticalChance = 0.01;      // 暴击率
            this.gameValues.tapDamage = 1;              // 点击伤害
            this.gameValues.tapBossDamage = 1;          // 魔王点击伤害
            this.gameValues.heroDamage = 0;             // 英雄伤害

            this.heroValues.heroDamage = 0;
            this.heroValues.allDamage = 0;
            this.heroValues.tapDamage = 0;
            this.heroValues.bossDamage = 0;
            this.heroValues.criticalDamage = 0;
            this.heroValues.criticalChance = 0;
            this.heroValues.goldAmount = 0;
            this.heroValues.chestGold = 0;
            this.heroValues.tapDPS = 0;

            this.artifactValues.allDamage = 0;
            this.artifactValues.DPS = 0;
            this.artifactValues.tapDamage = 0;
            this.artifactValues.heroDamage = 0;
            this.artifactValues.criticalDamage = 0;
            this.artifactValues.criticalChance = 0;
            this.artifactValues.bossTime = 0;
            this.artifactValues.bossLife = 0;
            this.artifactValues.bossGold = 0;
            this.artifactValues.mobGold = 0;
            this.artifactValues.mobCount = 0;
            this.artifactValues.goldCollection = 0;
            this.artifactValues.goldx10Chance = 0;
            this.artifactValues.goldPlaying = 0;
            this.artifactValues.evoRelics = 0;
            this.artifactValues.chestChance = 0;
            this.artifactValues.chestGold = 0;
            this.artifactValues.deathChance = 0;
            this.artifactValues.upgradeCost = 0;
            this.artifactValues.reviveTime = 0;
            this.artifactValues.evolutionBonus = 0;
            this.artifactValues.stageJump = 0;
            this.artifactValues.autoClick = 0;
            this.artifactValues.goldAfterReborn = 0;
            this.artifactValues.autoStage = 0;
            this.artifactValues.heavenlyStrikeCD = 0;
            this.artifactValues.heavenlyStrikeDuration = 0;
            this.artifactValues.shadowCloneCD = 0;
            this.artifactValues.shadowCloneDuration = 0;
            this.artifactValues.criticalStrikeCD = 0;
            this.artifactValues.criticalStrikeDuration = 0;
            this.artifactValues.warCryCD = 0;
            this.artifactValues.warCryDuration = 0;
            this.artifactValues.berserkerRageCD = 0;
            this.artifactValues.berserkerRageDuration = 0;
            this.artifactValues.handOfMidasCD = 0;
            this.artifactValues.handOfMidasDuration = 0;
            this.artifactValues.powerOfHoldingDuration = 0;

            this.updateTitans();
        },

        // ============================== damage methods ==============================
        getDamage: function(level) {
            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();
            var gameValues = this.getGameValues();

            var dmg = level * Math.pow(1.05, level);
            //英雄技能增加所有攻击的部分
            dmg *= (1 + heroValues.allDamage);
            //英雄的dps转tap，需要先加上来，后面才开始乘
            dmg += gameValues.heroDamage * heroValues.tapDPS;

            //英雄加成tap
            dmg *= (1 + heroValues.tapDamage);
            //神器全部攻击力加成
            dmg *= (1 + artifactValues.allDamage);
            //
            ////道具加成
            //var itemAdded = 0;
            //if(this.getPerk().isInBuffById(1014)) {
            //    itemAdded = 1;
            //
            //
            //    var foreverPlayerDamage = this.getForeverAugments(FOREVERAUGMENTTYPE.PLAYERDAMAGE);
            //    if( foreverPlayerDamage > 0){
            //        itemAdded += foreverPlayerDamage;
            //    }
            //}
            //
            ////神器特效（蛋刀）
            //dmg *= (1 + this.artifactEffect("hammer") + itemAdded);
            dmg *= (1 + artifactValues.tapDamage);

            return Math.ceil(dmg);
        },

        getBaseCost: function(level) {
            return Math.min(25, 3 + level) * Math.pow(1.074, level);
        },

        getCost: function(level) {
            var cost = this.getBaseCost(level);

            cost *= (1 + this.artifactValues.upgradeCost);

            return Math.ceil(cost);
        },

        calcUpgradeCost: function(cnt) {
            cnt = cnt || 1;
            if (cnt < 0) {
                cnt = 1;
            }

            var cost = 0;
            for (var i = 0; i < cnt; i++) {
                cost += this.getCost(this.level + i);
            }

            return Math.ceil(cost);
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

                if (!this.isGoldEnough(cost)) {
                    return i;
                }
            }

            return level;
        },

        upgrade: function(cnt) {
            cnt = cnt || 1;

            if (cnt < 0) {
                cnt = 1;
            }

            this.level += cnt;
            this.updateTitans();
            return cnt;
        },
        
        setLevel: function(level) {
            if (this.level >= level) {
                return false;
            }
    
            this.level = level;
            this.updateTitans();
            return level;
        },

        calcRelicByHeroLevel: function() {
            var totalHeroLevel = 0;
            for (var i = 0; i < this.MAX_HERO; i++) {
                var lv = this.heros[i].getLevel();
                if (lv > 0) {
                    totalHeroLevel += lv;
                }
            }

            var relics = totalHeroLevel/1000;
            return Math.ceil(relics);
        },

        calcRelicByStage: function() {
            var stage =  this.stage.getLevel();
            var relics = Math.pow(Math.floor(Math.max(0, stage - 75)/15), 1.7);

            return Math.ceil(relics);
        },

        calcRelicByArtifact: function() {
            var relics_1 = this.calcRelicByHeroLevel();
            var relics_2 = this.calcRelicByStage();
            var artifactValues = this.getArtifactValues();

            return Math.ceil((relics_1 + relics_2) * artifactValues.evolutionBonus);
        },

        calcRelicOnEvolution: function() {
            var relics = this.calcRelicByHeroLevel() + this.calcRelicByStage() + this.calcRelicByArtifact();
            var heroDead = false;
            for (var i = 0; i < this.MAX_HERO; i++) {
                //要判断英雄是否存在
                if (!this.heros[i].active()) {
                    heroDead = true;
                    break;
                }
            }
            //全英雄奖励
            if (heroDead == false) {
                relics *= 2;
            }
            return relics;
        },

        doEvolution: function() {
            this.level = 1;
            this.gold = 0;
            this.offlineGold = 0;
            this.evoCount++;
            this.lastEvolution = Number(root.moment().format('X'));
        },

        leaveDispose: function() {
            var nowTime = Number(root.moment().format('X'));
            if (this.lastLogin > 0) {
                this.totalPlayTime += nowTime - this.lastLogin;
            }

            this.lastLogout = nowTime;

            var coinCollect = this.collectAllCoin();
            if (coinCollect.gold > 0) {
                this.increaseGold(coinCollect.gold);
            }
            if (coinCollect.diamond > 0) {
                this.increaseDiamond(coinCollect.diamond);
            }
            if (coinCollect.relics > 0) {
                this.increaseRelic(coinCollect.relics);
            }
        },

        collectAllCoin: function() {
            var results = {
                gold: 0,
                diamond: 0,
                relics: 0
            };

            for (var uuid in this._coins) {
                var coin = this._coins[uuid];
                if (coin.isGold()) {
                    results.gold += coin.getAmount();
                }
                else if (coin.isDiamond()) {
                    results.diamond += coin.getAmount();
                }
                else if (coin.isRelics()) {
                    results.relics += coin.getAmount();
                }
            }

            for (var uuid in this._coins) {
                this.removeCoin(uuid);
            }

            return results;
        },

        addCoin: function(coin) {
            if (coin == null) {
                return;
            }

            this._coins[coin.uuid] = coin;
        },

        removeCoin: function(uuid) {
            delete this._coins[uuid];
        },

        findCoin: function(uuid) {
            return this._coins[uuid];
        },

        addArtifact: function(artifact) {
            if (artifact == null) {
                return;
            }

            this.artifacts[artifact.key] = artifact;
        },

        removeArtifact: function(key) {
            delete this.artifacts[key];
        },

        buyArtifactCost: function() {
            var artifactCount = 0;
            for (var key in this.artifacts) {
                var db = this.artifacts[key].getDB();
                if (db.not_for_sale != true) {
                    artifactCount++;
                }
            }
            var cost = (artifactCount + 1) * Math.pow(1.35, (artifactCount + 1));

            return Math.round(cost);
        },

        getFairyStamp: function() {
            return this._fairyStamp;
        },

        setFairyStamp: function(stamp) {
            this._fairyStamp = stamp;
        },

        genFairyStamp: function() {
            var nowTime = Number(root.moment().format("X"));
            // 三到四分钟一次
            //var rand = 180 + Math.ceil(Math.random() * 60);
            var rand = 30 + Math.ceil(Math.random() * 30);

            return nowTime + rand;
        },

        // ----------------------- player actions --------------
        tap: function() {
            var gameValues          = this.getGameValues();
            var stage               = this.getStage();
            var monster             = stage.getMonster();

            var damage              = gameValues.tapDamage;
            var criticalChance      = gameValues.criticalChance;
            var criticalStrike      = this.skills["criticalStrike"];
            var berserkerRage       = this.skills["berserkerRage"];

            var addCriticalChance   = 0;
            var addDamage           = 0;

            //*增加暴击率的技能
            if(criticalStrike.isRunning()){
                var criticalEffect = criticalStrike.getEffect();
                if (criticalEffect > 0) {
                    addCriticalChance = criticalEffect;
                }
            }

            var isCritical = (Math.random() < (criticalChance + addCriticalChance));
            if (monster.isBoss()) {
                if (isCritical) {
                    damage = gameValues.bossCriticalDamage;
                }
                else {
                    damage = gameValues.tapBossDamage;
                }
            }
            else {
                if (isCritical) {
                    damage = gameValues.criticalDamage;
                }
            }

            //*提升攻击力技能
            if (berserkerRage.isRunning()) {
                var berserkerRageEffect = berserkerRage.getEffect();
                if (berserkerRageEffect > 0) {
                    addDamage = berserkerRageEffect;
                    damage = Math.ceil(damage + (damage * addDamage));
                }
            }

            stage.hurtMonster(damage, Stage.HURT_TAP, this);

            return {damage: damage, critical: isCritical};
        },

        //* 战士狂怒技能效果
        heavenlyStrikeTap: function () {
            var gameValues       = this.getGameValues();
            var stage            = this.getStage();
            var damage           = gameValues.tapDamage;
            var skill            = this.skills["heavenlyStrike"];
            var monster          = stage.getMonster();

            if (monster.isBoss()) {
                damage = gameValues.tapBossDamage;
            }

            if (skill.isRunning() == true) {
                var effect = Number(skill.getEffect());
                if(effect > 0){
                    damage *= effect;
                }
            }

            var berserkerRage       = this.skills["berserkerRage"];

            //*提升攻击力技能
            if (berserkerRage.isRunning()) {
                var berserkerRageEffect = berserkerRage.getEffect();
                if (berserkerRageEffect > 0) {
                    var addDamage = berserkerRageEffect;
                    damage = Math.ceil(damage + (damage * addDamage));
                }
            }

            stage.hurtMonster(damage, Stage.HURT_TAP, this);

            return {damage: damage};
        },

        //* 影子战士技能效果
        shadowCloneTap: function () {
            var gameValues       = this.getGameValues();
            var stage            = this.getStage();
            var damage           = gameValues.tapDamage;
            var monster          = stage.getMonster();

            if (monster.isBoss()) {
                damage = gameValues.tapBossDamage;
            }

            stage.hurtMonster(damage, Stage.HURT_TAP, this);

            return {damage: damage};
        },

        // ----------------------- player sync ----------------
        syncPlayer: function(opts) {
            var self = this;
            var i;
            var value;
            var array;
            var info;
            var needUpTitan = false;

            opts = opts || {};

            if (opts.gold != null) {
                value = +opts.gold;
                if (value < 0) {
                    self.decreaseGold(value);
                    self.event(Player.UPDATEGOLD, self);
                }
                else if (value > 0) {
                    self.increaseGold(value);
                    self.event(Player.UPDATEGOLD, self);
                }
            }

            if (opts.diamond != null) {
                value = +opts.diamond;
                if (value < 0) {
                    self.decreaseDiamond(value);
                    self.event(Player.UPDATEDIAMOND, self);
                }
                else if (value > 0) {
                    self.increaseDiamond(value);
                    self.event(Player.UPDATEDIAMOND, self);
                }
            }

            if (opts.relics != null) {
                value = +opts.relics;
                if (value < 0) {
                    self.decreaseRelic(value);
                    self.event(Player.UPDATERELIC, self);
                }
                else if (value > 0) {
                    self.increaseRelic(value);
                    self.event(Player.UPDATERELIC, self);
                }
            }

            if (opts.upgrade != null) {
                value = parseInt(opts.upgrade);
                self.upgrade(value);
                self.event(Player.LEVELCHANGE, self);
            }

            if (opts.lastLogin != null) {
                value = parseInt(opts.lastLogin);
                self.lastLogin = value;
            }

            if (opts.offlineGold != null) {
                value = parseInt(opts.offlineGold);
                self.offlineGold = value;
            }

            if (opts.fairyStamp != null) {
                value = parseInt(opts.fairyStamp);
                self.setFairyStamp(value);
                self.event(Player.FAIRYSTAMP, value);
            }

            if (opts.stage != null) {
                value = opts.stage;
                self.stage.syncStage(value);
            }

            if (opts.hero != null) {
                array = opts.hero;
                for (i in array) {
                    var heroId = array[i].id;
                    if (heroId < 0 || heroId > 29) {
                        continue;
                    }

                    value = array[i].value;
                    self.heros[heroId].syncHero(value);
                }
            }

            if (opts.skill != null) {
                array = opts.skill;
                for (i in array) {
                    var skillName = array[i].name;
                    if (self.skills[skillName] == null) {
                        continue;
                    }

                    value = array[i].value;
                    self.skills[skillName].syncSkill(value);
                }
            }

            if (opts.items != null) {
                array = opts.items;
                for (i in array) {
                    var itemKey = array[i].key;
                    if (self.item[itemKey] == null) {
                        continue;
                    }

                    value = array[i].value;
                    self.item[itemKey].syncItem(value);
                }
            }

            if (opts.fairyCoins != null) {
                array = opts.fairyCoins;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        self.addCoin(Coin.create(info, self));
                        self.event(Player.ADDFAIRYCOIN, info.uuid);
                    }
                }
            }

            if (opts.coins != null) {
                array = opts.coins;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        self.addCoin(Coin.create(info, self));
                        self.event(Player.ADDCOIN, info.uuid);
                    }
                }
            }

            if (opts.removeCoins != null) {
                array = opts.removeCoins;
                for (i in array) {
                    //info 是uuid
                    info = array[i];
                    if (info != null) {
                        self.removeCoin(info);
                        self.event(Player.REMOVECOIN, info);
                    }
                }
            }

            if (opts.artifacts != null) {
                array = opts.artifacts;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        var artifact = this.findArtifact(info.key);
                        if (artifact == null) {
                            self.addArtifact(Artifact.create(info, self));
                            self.event(Player.ADDARTIFACT, info.key);
                        }
                        else {
                            artifact.syncArtifact(info);
                            self.event(Player.UPDATEARTIFACT, info.key);
                        }
                        needUpTitan = true;
                    }
                }
            }

            if (opts.removeArtifacts != null) {
                array = opts.removeArtifacts;
                for (i in array) {
                    //info 是key
                    info = array[i];
                    if (info != null) {
                        self.removeArtifact(info);
                        self.event(Player.REMOVEARTIFACT, info);
                        needUpTitan = true;
                    }
                }
            }

            if (opts.fairies != null) {
                array = opts.fairies;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        self.addFairy(Fairy.create(info, self));
                        self.event(Player.ADDFAIRY, info.uuid);
                    }
                }
            }

            if (opts.removeFairies != null) {
                array = opts.removeFairies;
                for (i in array) {
                    //info 是uuid
                    info = array[i];
                    if (info != null) {
                        self.removeFairy(info);
                        self.event(Player.REMOVEFAIRY, info);
                    }
                }
            }

            if (opts.evolution) {
                this.doEvolution();
                needUpTitan = true;
            }

            if (needUpTitan) {
                this.updateTitans();
            }
        }
    });

    Player.UPDATEGOLD       = "player.gold.update";
    Player.UPDATEDIAMOND    = "player.diamond.update";
    Player.UPDATERELIC      = "player.relic.update";
    Player.LEVELCHANGE      = "player.level.change";
    Player.ADDCOIN          = "player.add.coin";
    Player.REMOVECOIN       = "player.remove.coin";
    Player.ADDARTIFACT      = "player.add.artifact";
    Player.UPDATEARTIFACT   = "player.update.artifact";
    Player.REMOVEARTIFACT   = "player.remove.artifact";
    Player.FAIRYSTAMP       = "player.fairy.stamp.update";
    Player.ADDFAIRY         = "player.add.fairy";
    Player.ADDFAIRYCOIN     = "player.add.fairy.coin";
    Player.REMOVEFAIRY      = "player.remove.fairy";
}(hGame006));