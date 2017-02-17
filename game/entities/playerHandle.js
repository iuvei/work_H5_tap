(function(root) {
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
    var Player = root.Player;

    root.extend(Player.prototype, {
        //---------------stage handle begin----------------
        killMonsterHandle: function() {
            var results = {
                coins: [],
                stage: {
                    monster: null
                }
            };

            var currMonsterInfo = this.stage._monsterInfo;
            var gold = currMonsterInfo.gold;
            var coinOpts = {
                type: Coin.TYPE_GOLD,
                amount: gold
            };
            var coin = Coin.create(coinOpts, this);
            if (coin != null) {
                results.coins.push(coin.clone());
            }

            //80关以后每10关获得一个荣誉
            if (currMonsterInfo.type == root.Monster.TYPE_BOSS && currMonsterInfo.relics > 0) {
                coinOpts = {
                    type: Coin.TYPE_RELICS,
                    amount: currMonsterInfo.relics
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            var processInfo = this.stage.process();
            for (var i in processInfo) {
                results.stage[i] = processInfo[i];
            }
            this.stage.syncStage(results.stage);

            results.stage.monster = this.stage.genMonster();

            return results;
        },

        pausedHandle: function() {
            var results = {
                stage: {
                    paused: null,
                    monster: null
                }
            };

            var paused = this.stage.getPaused();
            results.stage.paused = paused ? false : true;

            this.stage.syncStage(results.stage);

            //要重新生成怪物
            results.stage.monster = this.stage.genMonster();

            return results;
        },
        //---------------stage handle end----------------

        //---------------player handle begin----------------
        gmHandle: function(opts) {
            var results = {
                gold: null
            };

            for (var key in opts) {
                switch (key) {
                    case "gold": {
                        results.gold = +opts[key];
                        break;
                    }
                    case "relics": {
                        results.relics = +opts[key];
                        break;
                    }
                    case "diamond": {
                        results.diamond = +opts[key];
                        break;
                    }
                }
            }

            return results;
        },
        enterHandle: function() {
            var nowTime = Number(root.moment().format('X'));
            var results = {
                lastLogin: null,
                fairyStamp: null,
                stage: {
                    monster: null
                }
            };
            results.stage.monster = this.stage.genMonster();
            results.lastLogin = nowTime;
            if (this.lastLogout > 0) {
                var currLeaveTime = nowTime - this.lastLogout;
                var currGold = this.stage.calcOfflineGold(currLeaveTime);
                results.offlineGold = this.offlineGold + currGold;
            }

            results.fairyStamp = this.genFairyStamp();

            return results;
        },

        upgradeHandle: function(opts) {
            var results = {
                gold: null,
                upgrade: null
            };

            //这里的level是升级量 需要提升level级
            var level = opts.level;
            var free = opts.free;
            var cost = this.calcUpgradeCost(level);

            if (free == false) {
                if (!this.isGoldEnough(cost)) {
                    return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
                }
                results.gold = -1 * cost;
            }

            results.upgrade = level;

            return results;
        },

        skillUpgradeHandle: function(opts) {
            var results = {
                gold: null,
                skill: null
            };

            var name = opts.name;
            var skill = this.skills[name];
            if (skill == null) {
                return {err: Code.GAME_ERR.WRONG_SKILL};
            }

            var cost = skill.getCost();

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }
            results.gold = -1 * cost;

            results.skill = [
                {
                    name: name,
                    value: {upgrade: true}
                }
            ];

            return results;
        },

        skillCastHandle: function(opts) {
            var results = {
                skill: null
            };

            var name = opts.name;
            var skill = this.skills[name];
            if (skill == null || skill.getLevel() <= 0) {
                return {err: Code.GAME_ERR.WRONG_SKILL};
            }

            var err = skill.castCheck();

            if (err != null) {
                return {err: err};
            }

            var nowTime = Number(root.moment().format("X"));
            var availableTime = skill.getCoolDown() + nowTime;
            var durationTime = skill.getDuration() + nowTime;

            results.skill = [
                {
                    name: name,
                    value: {
                        cast: {
                            availableTime: availableTime,
                            durationTime: durationTime
                        }
                    }
                }
            ];

            return results;
        },

        offlineGoldHandle: function() {
            var results = {
                gold: null,
                offlineGold: null
            };

            if (this.offlineGold > 0) {
                results.gold = this.offlineGold;
                results.offlineGold = 0;
            }

            return results;
        },

        //黄金风暴点击奖励
        midasHandle: function() {
            var results = {
                gold: null
            };

            var skill = this.skills["handOfMidas"];

            if (!skill.isRunning()) {
                return results;
            }

            var gold = this.stage._monsterInfo.gold;
            if (gold <= 0) {
                return results;
            }

            var effect = skill.getEffect();
            gold = Math.ceil(gold * effect);

            results.gold = gold;
            return results;
        },

        getCoinHandle: function(opts) {
            var results = {
                gold: null,
                diamond: null,
                relics: null,
                removeCoins: null
            };

            var uuid = opts.uuid || "";
            var coin = this.findCoin(uuid);
            if (coin == null) {
                return results;
            }

            if (coin.isGold()) {
                results.gold = coin.getAmount();
            }
            else if (coin.isDiamond()) {
                results.diamond = coin.getAmount();
            }
            else if (coin.isRelics()) {
                results.relics = coin.getAmount();
            }

            results.removeCoins = [uuid];

            return results;
        },

        evolutionHandle: function() {
            var results = {
                evolution: true,            //收到evolution会重置主角等级
                hero: [],
                skill: [],
                coins: [],
                removeCoins: [],
                stage: {
                    reset: null,
                    monster: null
                }
            };

            if (this.level < 600 && this.stage.getLevel() <= 75) {
                return {err: Code.GAME_ERR.CANT_EVOLUTION};
            }

            var coin;
            var coinOpts;
            var artifactValues = this.getArtifactValues();

            //检查金币掉落 都删除
            for (var coinId in this._coins) {
                coin = this._coins[coinId];
                if (coin && coin.isGold()) {
                    results.removeCoins.push(coinId);
                }
            }

            //英雄信息重置
            for (var heroId in this.heros) {
                var hero = this.heros[heroId];
                if (hero.getLevel() > 0) {
                    results.hero.push({
                        id: heroId,
                        value: {
                            reset: true
                        }
                    });
                }
            }

            //技能信息重置
            for (var skillName in this.skills) {
                var skill = this.skills[skillName];
                if (skill.getLevel() > 0) {
                    results.skill.push({
                        name: skillName,
                        value: {
                            reset: true
                        }
                    });
                }
            }

            //主角等级在results.evolution 处理
            //gameValues会在updateTitan里面更新 所以不用处理

            var stage = 1;
            //在这里添加越级弹簧的CD判断

            if (artifactValues.stageJump > 0) {
                stage = artifactValues.stageJump;
            }

            results.stage.reset = {level: stage};

            if (stage > 80) {
                coinOpts = {
                    type: Coin.TYPE_RELICS,
                    amount: Math.ceil((stage - 80)/10)
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            //重置关卡
            this.stage.syncStage(results.stage);

            //要重新生成怪物
            results.stage.monster = this.stage.genMonster();

            //转生金币神器
            if (artifactValues.goldAfterReborn > 0) {
                var info = this.getStage().calculate(artifactValues.goldAfterReborn);
                var gold = info.rbMobGold * 100;
                coinOpts = {
                    type: Coin.TYPE_GOLD,
                    amount: parseInt(gold)
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            //转生获得荣誉
            var relic = this.calcRelicOnEvolution();
            if (relic > 0) {
                coinOpts = {
                    type: Coin.TYPE_RELICS,
                    amount: relic
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            return results;
        },
        //---------------player handle end----------------

        //---------------hero handle begin----------------
        heroUpgradeHandle: function(opts) {
            var results = {
                gold: null,
                hero: null
            };

            //这里的level是升级量 需要提升level级
            var level = opts.level;
            var id = opts.id;
            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            level = hero.canUpgradeLevel(level);

            var cost = hero.calcUpgradeCost(level);

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }
            results.gold = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {upgrade: level}
                }
            ];

            return results;
        },

        heroSkillUpgradeHandle: function(opts) {
            var results = {
                gold: null,
                hero: null
            };

            var skillId = opts.skillId;
            var id = opts.id;

            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            var err = hero.skillUpgradeCondition(skillId);
            if (err != null) {
                return {err: err};
            }

            var cost = hero.getSkillCost(skillId);

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }

            results.gold = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {skill: skillId}
                }
            ];

            return results;
        },

        heroEvolutionHandle: function(opts) {
            var results = {
                gold: null,
                hero: null
            };

            var id = opts.id;
            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            if (hero.getLevel() != 1000) {
                return {err: Code.GAME_ERR.CANT_EVOLUTION};
            }

            var cost = hero.calcUpgradeCost(1);

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }
            results.gold = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {evolution: true}
                }
            ];

            return results;
        },

        heroDeadHandle: function() {
            var results = {
                hero: null
            };

            var monsterInfo = this.stage._monsterInfo;

            if (monsterInfo == null || monsterInfo.type != root.Monster.TYPE_BOSS) {
                return results;
            }

            if (monsterInfo.deadHero == null) {
                return results;
            }

            var hero = this.getHero(monsterInfo.deadHero);
            if (!hero.active()) {
                return results;
            }

            var stage = this.stage.getLevel();
            var time = Math.ceil((stage - 50) / 10);
            time *= 3600;
            if (time > 86400) {
                time = 86400;
            }
            //神器加成
            var artifactValues = this.getArtifactValues();
            time *= (1 + artifactValues.reviveTime);
            time = Math.ceil(time);

            results.hero = [
                {
                    id: monsterInfo.deadHero,
                    value: {die: time}
                }
            ];

            return results;
        },

        heroReviveHandle: function(opts) {
            var results = {
                diamond: null,
                hero: null
            };

            var id = opts.id;
            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            if (hero.active()) {
                return {err: Code.GAME_ERR.HERO_CANT_REVIVED};
            }

            var cost = hero.getReviveCost();
            if (cost <= 0) {
                return {err: Code.GAME_ERR.HERO_CANT_REVIVED};
            }

            if (!this.isDiamondEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_DIAMOND};
            }
            results.diamond = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {revive: true}
                }
            ];

            return results;
        },
        //---------------hero handle end----------------

        //---------------artifact handle begin----------------
        buyArtifactHandle: function() {
            var results = {
                relics: null,
                artifacts: []
            };

            var cost = this.buyArtifactCost();
            if (!this.isRelicEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_RELIC};
            }

            var totalWeight = 0;
            var keyList = [];
            for (var key in Game.ARTIFACT_LIST) {
                var row = Game.ARTIFACT_LIST[key];

                if (this.findArtifact(key) != null) {
                    continue;
                }

                //不可出售的都是不能正常抽到的了
                if (row.not_for_sale) {
                    continue;
                }

                keyList.push({key: key, weight: row.weight});
                totalWeight += row.weight;
            }

            if (keyList.length <= 0) {
                return {err: Code.GAME_ERR.NO_ARTIFACT_BUY};
            }

            var rand = Math.floor(Math.random() * totalWeight);
            var buyKey = "";

            for (var i = 0; i < keyList.length; i++) {
                var row = keyList[i];
                if (row.weight < rand) {
                    buyKey = row.key;
                    break;
                }

                rand -= row.weight;
            }

            if (buyKey == "") {
                var debugInfo = "[ debug ] buy artifact rand: " + rand + " totalWeight: " + totalWeight;
                console.log(debugInfo);
                return {err: Code.GAME_ERR.NO_ARTIFACT_BUY, msg: debugInfo};
            }

            var artifactOpts = {
                key: buyKey,
                level: 1,
                consume: cost
            };
            var artifact = Artifact.create(artifactOpts, this);
            if (artifact != null) {
                results.artifacts.push(artifact.clone());
            }

            results.relics = -1 * cost;

            return results;
        },

        saleArtifactHandle: function(opts) {
            var results = {
                relics: null,
                removeArtifacts: []
            };

            var key = opts.key;
            var artifact = this.findArtifact(key);
            if (artifact == null) {
                return {err: Code.GAME_ERR.NOT_ARTIFACT};
            }

            if (artifact.isNotForSale()) {
                return {err: Code.GAME_ERR.ARTIFACT_NOT_FOR_SALE};
            }

            var cost = artifact.getSaleCost();
            if (!this.isDiamondEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_DIAMOND};
            }

            results.relics = artifact.getConsume();
            results.removeArtifacts.push(key);

            return results;
        },

        upgradeArtifactHandle: function(opts) {
            var results = {
                relics: null,
                artifacts: []
            };

            var key = opts.key;
            var artifact = this.findArtifact(key);
            if (artifact == null) {
                return {err: Code.GAME_ERR.NOT_ARTIFACT};
            }

            var level = artifact.getLevel();
            var maxLevel = artifact.getMaxLevel();

            if (maxLevel != -1 && level >= maxLevel) {
                return {err: Code.GAME_ERR.ARTIFACT_LEVEL_MAX};
            }

            var cost = artifact.getCost();
            if (!this.isRelicEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_RELIC};
            }

            results.relics = -1 * cost;
            results.artifacts.push({key: key, upgrade: cost});

            return results;
        },
        //---------------artifact handle end----------------

        //---------------fairy handle begin----------------
        makeFairyHandle: function() {
            var self = this;
            var results = {
                fairyStamp: null,
                fairies: []
            };
            var times = 1;

            //还没到时间
            //var nowTime = Number(root.moment().format("X"));
            //if (this.getFairyStamp() < nowTime) {
            //    return results;
            //}

            //双飞判断

            var randList = [
                {type: Fairy.TYPE_GOLD, weight: 25},
                {type: Fairy.TYPE_DIAMOND, weight: 10},
                {type: Fairy.TYPE_SHADOW_CLONE, weight: 7},
                {type: Fairy.TYPE_CRITICAL_STRIKE, weight: 7},
                {type: Fairy.TYPE_WAR_CRY, weight: 7},
                {type: Fairy.TYPE_BERSERKER_RAGE, weight: 7},
                {type: Fairy.TYPE_HAND_OF_MIDAS, weight: 7}
            ];

            var i;
            var row;
            var totalWeight = 0;
            for (i = 0; i < randList.length; i++) {
                row = randList[i];
                totalWeight += row.weight;
            }

            while (times > 0) {
                var type = Fairy.TYPE_GOLD;

                //随机 一般times不会大于2 这里做保护 如果列表用光则默认金币
                if (randList.length > 0) {
                    var index = 0;
                    var rand = Math.floor(Math.random() * totalWeight);
                    for (i = 0; i < randList.length; i++) {
                        row = randList[i];
                        if (rand < row.weight) {
                            index = i;
                            break;
                        }
                        rand -= row.weight;
                    }
                    row = randList[index];
                    type = row.type;
                    totalWeight -= row.weight;
                    randList.splice(index, 1);
                }

                var fairyOpts = {
                    type: type
                };
                var fairy = Fairy.create(fairyOpts, self);
                if (fairy != null) {
                    results.fairies.push(fairy.clone());
                }
                times--;
            }

            //下一次小精灵时间
            results.fairyStamp = this.genFairyStamp();

            return results;
        },

        collectFairyHandle: function(opts) {
            var results = {
                fairyCoins: [],
                skill: null,
                removeFairies: []
            };

            var uuid = opts.uuid;
            var fairy = this.findFairy(uuid);
            if (fairy == null) {
                return results;
            }

            //先记录删除精灵的信息
            results.removeFairies.push(uuid);

            var type = fairy.getType();

            if (fairy.isSkill()) {
                //技能的时候 type就是技能名
                var name = type;
                var skill = this.skills[name];
                //没找到这个技能或者技能正在使用 就变成金币奖励
                if (skill == null || skill.isRunning()) {
                    type = Fairy.TYPE_GOLD;
                }
                else {
                    var nowTime = Number(root.moment().format("X"));
                    var availableTime = null;
                    var durationTime = Math.floor(skill.getDuration() / 2 + nowTime);

                    results.skill = [
                        {
                            name: name,
                            value: {
                                cast: {
                                    availableTime: availableTime,
                                    durationTime: durationTime
                                }
                            }
                        }
                    ];

                    return results;
                }
            }

            var coinOpts;

            //钻石奖励 一个钻石
            if (type == Fairy.TYPE_DIAMOND) {
                coinOpts = {
                    type: Coin.TYPE_DIAMOND,
                    amount: 1
                };
            }
            //金币奖励 一个宝箱的金币
            else {
                var stage = this.getStage();
                var gold = 100;
                if (stage != null) {
                    gold = stage.chestGold;
                }

                coinOpts = {
                    type: Coin.TYPE_GOLD,
                    amount: gold
                };
            }

            var coin = Coin.create(coinOpts, this);
            if (coin != null) {
                results.fairyCoins.push(coin.clone());
            }

            return results;
        },

        removeFairyHandle: function(opts) {
            var results = {
                removeFairies: []
            };

            var uuid = opts.uuid;
            var fairy = this.findFairy(uuid);
            if (fairy == null) {
                return results;
            }

            //先记录删除精灵的信息
            results.removeFairies.push(uuid);
            return results;
        },
        //---------------fairy handle end----------------

        //---------------item handle begin----------------
        itemCastHandle: function(opts) {
            var results = {
                diamond: null,
                fairies: [],
                items: [],
                skill: []
            };

            var key = opts.key;
            var item = this.findItem(key);
            if (item == null) {
                return results;
            }

            if (item.getAvailable() > 0) {
                return {err: Code.GAME_ERR.ITEM_IS_ON_CD};
            }

            var castInfo = {key: key};
            //有剩余次数则扣一次次数
            if (item.getCount() > 1) {
                castInfo.count = -1;
            }
            else {
                var cost = item.getCost();
                if (!this.isDiamondEnough(cost)) {
                    return {err: Code.GAME_ERR.NOT_ENOUGH_DIAMOND};
                }
                results.diamond = -1 * cost;
            }


            var nowTime = Number(root.moment().format("X"));
            castInfo.availableTime = item.getCoolDown() + nowTime;
            castInfo.durationTime = item.getDuration() + nowTime;

            results.items.push(castInfo);
            //以上把道具自身的设定搞好了。下面就是部分技能需要服务器处理的

            switch (key) {
                case "storm": {
                    var fairyCount = 10;
                    var totalGold = item.getEffect();
                    var everyGold = totalGold / fairyCount;

                    while (fairyCount > 0) {
                        var fairyOpts = {
                            type: Fairy.TYPE_GOLD,
                            amount: everyGold
                        };
                        var fairy = Fairy.create(fairyOpts, self);
                        if (fairy != null) {
                            results.fairies.push(fairy.clone());
                        }
                        fairyCount--;
                    }
                    break;
                }
                case "refresh": {
                    for (var skillName in Game.SKILL_LIST) {
                        results.skill.push(
                            {
                                name: skillName,
                                value: {
                                    refresh: true
                                }
                            });
                    }
                    break;
                }
            }

            return results;
        }
        //---------------item handle end----------------
    });

}(hGame006));