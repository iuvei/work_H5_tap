(function(root) {
    var Game = root.Game;
    var Interface = root.Interface = {
        isGoldEnough: function(amount) {
            return this._player.gold >= Math.abs(amount);
        },

        decreaseGold: function(amount) {
            var gold = this._player.gold;
            gold -= Math.abs(amount);
            if (gold < 0) {
                gold = 0;
            }
            this._player.gold = gold;
        },

        increaseGold: function(amount) {
            var gold = this._player.gold;
            if (gold < 0) {
                gold = 0;
            }
            gold += Math.abs(amount);
            this._player.gold = gold;
        },

        getDiamond: function() {
            return this._player.diamond;
        },

        setDiamond: function(x) {
            this._player.diamond = x;
        },

        isDiamondEnough: function(x) {
            return this._player.diamond >= Math.abs(x);
        },

        increaseDiamond: function(x) {
            this._player.diamond += Math.abs(x);
        },

        decreaseDiamond: function(x) {
            this._player.diamond -= Math.abs(x);
            if (this._player.diamond < 0) {
                this._player.diamond = 0;
            }
        },

        getRelic: function() {
            return this._player.relics;
        },

        setRelic: function(x) {
            this._player.relics = x;
        },

        isRelicEnough: function(x) {
            return this._player.relics >= Math.abs(x);
        },

        increaseRelic: function(x) {
            this._player.relics += Math.abs(x);
        },

        decreaseRelic: function(x) {
            this._player.relics -= Math.abs(x);
            if (this._player.relics < 0) {
                this._player.relics = 0;
            }
        },

        addFairy: function(fairy) {
            if (fairy == null) {
                return;
            }

            this._player._fairies[fairy.uuid] = fairy;
        },

        removeFairy: function(uuid) {
            delete this._player._fairies[uuid];
        },

        findFairy: function(uuid) {
            return this._player._fairies[uuid];
        },

        getWeapon: function() {
            return this._player.weapons;
        },

        setWeapon: function(x) {
            this._player.weapons = x;
        },

        isWeaponEnough: function(x) {
            return this._player.weapons >= Math.abs(x);
        },

        increaseWeapon: function(x) {
            this._player.weapons += Math.abs(x);
        },

        decreaseWeapon: function(x) {
            this._player.weapons -= Math.abs(x);
            if (this._player.weapons < 0) {
                this._player.weapons = 0;
            }
        },

        getGameValues: function() {
            return this._player.gameValues;
        },

        getHeroValues: function() {
            return this._player.heroValues;
        },

        getArtifactValues: function() {
            return this._player.artifactValues;
        },

        getStage: function() {
            return this._player.stage;
        },

        getHero: function(heroIndex) {
            return this._player.heros[heroIndex];
        },

        findArtifact: function(key) {
            return this._player.artifacts[key];
        },

        getAchievement: function(achIndex) {
            return this._player.achievements[achIndex];
        },

        findItem: function(key) {
            return this._player.items[key];
        },

        //超过50关之后的boss生成的时候调用来查看是否有英雄死亡
        genHeroKillInfo: function(stage) {
            //todo 盾牌道具效果

            var rate = 0.2;
            if (stage % 5 != 0) {
                rate = 0.05;
            }

            var artifactValues = this.getArtifactValues();
            rate *= (1 + artifactValues.deathChance);

            //暂时百分百
            //if (Math.random() >= rate) {
            //    return null;
            //}

            var heroList = [];
            for (var i = 0; i < Game.MAX_HERO; i++) {
                var hero = this.getHero(i);
                if (hero && hero.active()) {
                    heroList.push(i);
                }
            }

            if (heroList.length == 0) {
                return null;
            }

            var index = Math.floor(Math.random() * heroList.length);
            var heroId = heroList[index];

            //5~25秒之间随机
            var time = Math.random() * 20 + 5;
            time = Math.ceil(time);

            return {heroId: heroId, time: time};
        },

        // 核心计算：更新所有英雄的技能效果
        updateHeroValues: function() {
            var heroValues = this.getHeroValues();
            for (var key in heroValues) {
                if (heroValues.hasOwnProperty(key)) {
                    heroValues[key] = 0;
                }
            }

            for (var index = 0; index < Game.MAX_HERO; index++) {
                var hero = this.getHero(index);

                if (hero.active() == false) {
                    continue;
                }

                var multiplier = 0;
                for (var i = 0; i < Game.MAX_HERO_SKILL; i++) {
                    var type = hero.getSkillType(i);
                    var effect = hero.getSkillEffect(i);

                    if (type == 'heroDamage') {
                        multiplier += effect;
                    }
                    else {
                        heroValues[type] += effect;
                    }
                }

                if (multiplier > 0) {
                    hero._multiplier = multiplier;
                }
            }
        },

        // 核心计算：更新所有神器的效果
        updateArtifactValues: function() {
            var artifactValues = this.getArtifactValues();

            for (var effect in artifactValues) {
                artifactValues[effect] = 0;
            }

            for (var artifactKey in this._player.artifacts) {
                var artifact = this.findArtifact(artifactKey);
                var effectInfo = artifact.getEffect();

                if (artifactValues[effectInfo.effect] == null) {
                    console.log("[ debug ] artifact effect lost " + effectInfo.effect);
                    artifactValues[effectInfo.effect] = 0;
                }

                artifactValues[effectInfo.effect] += effectInfo.value;
                artifactValues.allDamage += artifact.getDamage();
            }
        },

        // 核心计算：更新所有游戏中用的计算数值
        updateTitans: function() {
            this.getStage().update();

            var heroDamage = 0;
            for (var i = 0; i < Game.MAX_HERO; i++) {
                var hero = this.getHero(i);
                if (hero.active() == true) {
                    heroDamage += hero.getDPS();
                }
            }

            this.updateHeroValues();
            this.updateArtifactValues();

            //下面这堆因为都是object 可以直接在赋值的变量上更改
            var gameValues = this.getGameValues();
            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();

            gameValues.heroDamage = heroDamage;

            gameValues.tapDamage = this._player.getDamage(this._player.level);
            gameValues.tapBossDamage = Math.ceil(gameValues.tapDamage * (1 + heroValues.bossDamage));

            gameValues.criticalChance = 0.01 + heroValues.criticalChance + artifactValues.criticalChance;
            gameValues.criticalMultiplier = Math.ceil((10 + heroValues.criticalDamage) * (1 + artifactValues.criticalDamage));

            gameValues.criticalDamage = Math.ceil(gameValues.tapDamage * gameValues.criticalMultiplier);
            gameValues.bossCriticalDamage = Math.ceil(gameValues.tapBossDamage * gameValues.criticalMultiplier);
        }
    };
}(hGame006));