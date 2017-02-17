(function(root) {
    var Game = root.Game = function() {
          
    };

    Game.MAX_SKILL = 6;
    Game.MAX_HERO = 30;
    Game.MAX_HERO_SKILL = 7;
    Game.SKILL_AT_LEVEL = [10, 25, 50, 100, 200, 400, 800];
    Game.BOSS_MULTIPLIER = [2, 4, 6, 7, 10];

    Game.TANK_REBORN_LEVEL = 600;
    Game.TANK_REBORN_STAGE = 75;

    Game.SKILL_TRASLACTION = {
        heroDamage: "英雄自身攻击力加成",
        allDamage: "所有攻击加成",
        criticalDamage: "暴击伤害加成",
        bossDamage: "对魔王伤害加成",
        tapDamage: "点击攻击力加成",
        tapDPS: "点击攻击力提升总DPS的",
        criticalChance: "暴击率提高",
        goldAmount: "掉落黄金加成",
        chestGold: "宝箱怪掉落金币加成",
        reborn:"重置这个英雄并大幅增加攻击力"
    };

    Game.SKILL_NAMELIST = ["heavenlyStrike", "shadowClone", "criticalStrike", "warCry", "berserkerRage", "handOfMidas"];

    Game.SKILL_LIST = {
        "heavenlyStrike": { 
            name: "战士狂怒",
            cost: function(level) {
                return level * 160 + 50;  
            },
            effect: function(level) {
                return level*70 + 70;  
            },
            cd: 600,
            cdArtifact: "heavenlyStrikeCD",
            duration: 0,
            dtArtifact: "heavenlyStrikeDuration",
            id: 10001,
            startLevel: 50,
            effectDesc: function(effect){
                return "瞬间攻击力提升" + effect + "倍";
            }
        },

        "shadowClone": {
            name: "旋风斩",
            cost: function(level) {
                return level * 100 + 100;
            },
            effect: function(level) {
                return level*3 + 4;
            },
            cd: 600,
            cdArtifact: "shadowCloneCD",
            duration: 30,
            dtArtifact: "shadowCloneDuration",
            id: 10002,
            startLevel: 100,
            effectDesc: function(effect){
                return "召唤" + effect + "次/秒的影子战士";
            }
        },

        "criticalStrike": {
            name: "嗜血斩击",
            cost: function(level) {
                return level * 140 + 200;
            },
            effect: function(level) {
                return (level*3 + 14)/100;
            },
            cd: 1800,
            cdArtifact: "criticalStrikeCD",
            duration: 30,
            dtArtifact: "criticalStrikeDuration",
            id: 10003,
            startLevel: 200,
            effectDesc: function(effect){
                return "暴击率提升" + (Math.floor(effect * 100)) + "%";
            }
        },

        "warCry": {
            name: "冲锋号角",
            cost: function(level) {
                return level * 110 + 300;
            },
            effect: function(level) {
                return (level*50 + 100)/100;
            },
            cd: 1800,
            cdArtifact: "warCryCD",
            duration: 30,
            dtArtifact: "warCryDuration",
            id: 10004,
            startLevel: 300,
            effectDesc: function(effect){
                return "所有英雄的攻击速度提升" + (Math.floor(effect * 100)) + "%";
            }
        },

        "berserkerRage": {
            name: "巨龙怒吼",
            cost: function(level) {
                return level * 130 + 400;
            },
            effect: function(level) {
                return (level*30 + 40)/100;
            },
            cd: 3600,
            cdArtifact: "berserkerRageCD",
            duration: 30,
            dtArtifact: "berserkerRageDuration",
            id: 10005,
            startLevel: 400,
            effectDesc: function(effect){
                return "点击攻击力提升" + (Math.floor(effect * 100)) + "%";
            }
        },

        "handOfMidas": {
            name: "黄金风暴",
            cost: function(level) {
                return level * 130 + 500;
            },
            effect: function(level) {
                return (level*5 + 10)/100;
            },
            cd: 3600,
            cdArtifact: "handOfMidasCD",
            duration: 30,
            dtArtifact: "handOfMidasDuration",
            id: 10006,
            startLevel: 500,
            effectDesc: function(effect){
                return "每次点击可获得" + (Math.floor(effect * 100)) + "%怪物金币";
            }
        }
    };

    Game.HERO_LIST = [
        {id: 1001, name:"风暴米酒.李", dps:4, cost:"50", freq: 1000, skillType:["heroDamage", "heroDamage", "allDamage", "criticalDamage", "heroDamage", "allDamage", "heroDamage"], skillValue:[0.5, 1, 0.1, 0.1, 10, 0.25, 100]},
        {id: 1002, name:"詹姆斯.克劳森", dps:16, cost:"175", freq: 2400, skillType:["tapDamage", "heroDamage", "heroDamage", "tapDPS", "allDamage", "goldAmount", "heroDamage"], skillValue:[0.05, 1, 10, 0.004, 0.1, 0.1, 100]},
        {id: 1003, name:"麦格伦", dps:56, cost:"674",freq: 1900,  skillType:["heroDamage", "goldAmount", "allDamage", "tapDPS", "chestGold", "criticalChance", "allDamage"], skillValue:[1.5, 0.1, 0.1, 0.004, 0.2, 0.01, 0.3]},
        {id: 1004, name:"奥瑞姆.钢趾", dps:207, cost:"2.85E+3", freq: 3200, skillType:["heroDamage", "heroDamage", "goldAmount", "heroDamage", "criticalDamage", "allDamage", "chestGold"], skillValue:[1, 8, 0.06, 5, 0.05, 0.2, 0.2]},
        {id: 1005, name:"欧沃斯巴克", dps:807, cost:"13.3E+3", freq: 3900, skillType:["heroDamage", "goldAmount", "tapDPS", "goldAmount", "chestGold", "tapDamage", "heroDamage"], skillValue:[3, 0.1, 0.004, 0.15, 0.2, 0.05, 100]},
        {id: 1006, name:"吉娜.羽弓", dps:3.29E+3, cost:"68.1E+3", freq: 3700, skillType:["heroDamage", "heroDamage", "allDamage", "allDamage", "criticalDamage", "criticalChance", "heroDamage"], skillValue:[2, 7, 0.1, 0.2, 0.05, 0.02, 100]},
        {id: 1007, name:"奇普.英代尔", dps:14.14E+3, cost:"384E+3", freq: 1700, skillType:["heroDamage", "bossDamage", "bossDamage", "heroDamage", "tapDamage", "chestGold", "allDamage"], skillValue:[2, 0.05, 0.07, 6, 0.05, 0.2, 0.3]},
        {id: 1008, name:"艾莉恩蒂", dps:63.64E+3, cost:"2.36E+6", freq: 3100, skillType:["heroDamage", "allDamage", "tapDPS", "goldAmount", "chestGold", "heroDamage", "allDamage"], skillValue:[2, 0.1, 0.004, 0.15, 0.2, 19, 0.2]},
        {id: 1009, name:"罗格姆地狱咆哮", dps:440.12E+3, cost:"23.8E+6", freq: 1500, skillType:["heroDamage", "bossDamage", "allDamage", "criticalDamage", "heroDamage", "allDamage", "heroDamage"], skillValue:[1.5, 0.05, 0.3, 0.05, 50, 0.25, 100]},
        {id: 1010, name:"鹰风酋长", dps:1.73E+6, cost:"143E+6", freq: 2900, skillType:["heroDamage", "criticalChance", "bossDamage", "goldAmount", "chestGold", "chestGold", "allDamage"], skillValue:[1.5, 0.01, 0.05, 0.15, 0.2, 0.25, 0.15]},
        {id: 1011, name:"金萨拉", dps:7.15E+6, cost:"943E+6", freq: 2800, skillType:["heroDamage", "heroDamage", "tapDamage", "tapDPS", "goldAmount", "criticalChance", "heroDamage"], skillValue:[2, 8.5, 0.05, 0.004, 0.15, 0.01, 38]},
        {id: 1012, name:"马克西米琳", dps:30.65E+6, cost:"6.84E+9", freq: 3800, skillType:["heroDamage", "heroDamage", "bossDamage", "criticalDamage", "tapDPS", "tapDamage", "goldAmount"], skillValue:[2.5, 13, 0.07, 0.05, 0.004, 0.05, 0.2]},
        {id: 1013, name:"祖金", dps:136.87E+6, cost:"54.7E+9", freq: 3500, skillType:["heroDamage", "heroDamage", "tapDamage", "allDamage", "allDamage", "criticalDamage", "heroDamage"], skillValue:[1.5, 8.5, 0.05, 0.2, 0.3, 0.05, 120]},
        {id: 1014, name:"姆拉", dps:1.08E+9, cost:"820E+9", freq: 3400, skillType:["heroDamage", "heroDamage", "tapDPS", "heroDamage", "goldAmount", "criticalDamage", "goldAmount"], skillValue:[2, 11, 0.004, 4, 0.1, 0.1, 0.2]},
        {id: 1015, name:"凯拉.风刃", dps:5.38E+9, cost:"8.2E+12", freq: 2300, skillType:["heroDamage", "allDamage", "bossDamage", "criticalChance", "criticalDamage", "chestGold", "heroDamage"], skillValue:[3, 0.4, 0.05, 0.02, 0.15, 0.2, 100]},
        {id: 1016, name:"德利奥斯.银刃", dps:76.51E+9, cost:"164E+12", freq: 1200, skillType:["heroDamage", "chestGold", "goldAmount", "bossDamage", "bossDamage", "allDamage", "allDamage"], skillValue:[3.5, 0.25, 0.2, 0.05, 0.07, 0.15, 0.2]},
        {id: 1017, name:"伊莎贝拉", dps:547.07E+9, cost:"1.64E+15", freq: 1600, skillType:["heroDamage", "heroDamage", "goldAmount", "goldAmount", "tapDamage", "criticalDamage", "goldAmount"], skillValue:[1.5, 9, 0.1, 0.1, 0.05, 0.1, 0.25]},
        {id: 1018, name:"扎布拉暗矛", dps:11.73E+12, cost:"49.2E+15", freq: 1800, skillType:["heroDamage", "heroDamage", "bossDamage", "heroDamage", "tapDamage", "chestGold", "allDamage"], skillValue:[4, 5, 0.05, 4.5, 0.05, 0.2, 0.15]},
        {id: 1019, name:"麦格尼.铜须", dps:419.51E+12, cost:"2.46E+18", freq: 2100, skillType:["heroDamage", "heroDamage", "tapDPS", "tapDamage", "allDamage", "goldAmount", "allDamage"], skillValue:[2, 10, 0.005, 0.05, 0.1, 0.1, 0.1]},
        {id: 1020, name:"格尔宾.梅卡托克", dps:8.99E+15, cost:"73.8E+18", freq: 3000, skillType:["heroDamage", "heroDamage", "criticalDamage", "heroDamage", "tapDPS", "tapDamage", "goldAmount"], skillValue:[2.5, 6, 0.2, 4.5, 0.004, 0.1, 0.1]},
        {id: 1021, name:"周铁拳", dps:212.72E+15, cost:"2.44E+21", freq: 3300, skillType:["heroDamage", "tapDamage", "allDamage", "criticalChance", "allDamage", "chestGold", "heroDamage"], skillValue:[2, 0.05, 0.3, 0.02, 0.1, 0.2, 100]},
        {id: 1022, name:"NX01型", dps:15.2E+18, cost:"244E+21", freq: 1300, skillType:["heroDamage", "heroDamage", "allDamage", "heroDamage", "allDamage", "criticalDamage", "allDamage"], skillValue:[2.5, 7.5, 0.1, 5, 0.1, 0.3, 0.2]},
        {id: 1023, name:"阿鲁高", dps:2.17E+21, cost:"48.7E+24", freq: 2700, skillType:["heroDamage", "heroDamage", "tapDPS", "criticalDamage", "tapDamage", "criticalChance", "heroDamage"], skillValue:[3, 8, 0.004, 0.2, 0.1, 0.02, 100]},
        {id: 1024, name:"魔导师艾洛娜", dps:621.41E+21, cost:"19.5E+27", freq: 4000, skillType:["heroDamage", "heroDamage", "heroDamage", "goldAmount", "chestGold", "heroDamage", "allDamage"], skillValue:[2, 5, 12, 0.15, 0.2, 90, 0.15]},
        {id: 1025, name:"考格斯宾", dps:487.6E+24, cost:"21.4E+30", freq: 1100, skillType:["tapDamage", "tapDamage", "tapDPS", "allDamage", "goldAmount", "criticalChance", "heroDamage"], skillValue:[0.05, 0.05, 0.004, 0.1, 0.15, 0.02, 150]},
        {id: 1026, name:"吉安娜", dps:38.44E+30, cost:"2.36E+36", freq: 3600, skillType:["heroDamage", "heroDamage", "tapDPS", "bossDamage", "allDamage", "bossDamage", "goldAmount"], skillValue:[3.5, 6.5, 0.004, 0.05, 0.1, 0.05, 0.12]},
        {id: 1027, name:"沙娜安", dps:301.69E+42, cost:"25.9E+45", freq: 2600, skillType:["heroDamage", "heroDamage", "allDamage", "bossDamage", "criticalChance", "criticalDamage", "chestGold"], skillValue:[3, 7, 0.1, 0.1, 0.02, 0.3, 0.2]},
        {id: 1028, name:"娅琳石蹄", dps:237.66E+54, cost:"28.5E+60", freq: 2200, skillType:["heroDamage", "allDamage", "heroDamage", "heroDamage", "criticalDamage", "criticalChance", "allDamage"], skillValue:[3.5, 0.01, 4, 6, 0.2, 0.03, 0.15]},
        {id: 1029, name:"达拉那.克拉克", dps:18.69E+75, cost:"3.14E+81", freq: 2600, skillType:["heroDamage", "heroDamage", "goldAmount", "tapDamage", "goldAmount", "allDamage", "goldAmount"], skillValue:[3.3, 5.5, 0.1, 0.1, 0.2, 0.1, 0.3]},
        {id: 1030, name:"克里多尔米", dps:13.36E+90, cost:"3.14E+96", freq: 2200, skillType:["criticalDamage", "tapDamage", "tapDPS", "goldAmount", "allDamage", "allDamage", "allDamage"], skillValue:[0.4, 0.2, 0.01, 0.6, 0.2, 0.3, 0.4]},
        {id: 1031, name:"Pixie the Rebel Fairy", dps:1.14E+96, cost:"3.76E+116", freq: 1000,skillType:["heroDamage", "heroDamage", "criticalChance", "tapDamage", "chestGold", "allDamage", "goldAmount"], skillValue:[9.0, 20.0, 0.01, 0.6, 0.25, 0.1, 0.15]},
        {id: 1032, name:"Jackalope the Fireballer", dps:9.01E+115, cost:"4.14E+136", freq: 1000,skillType:["heroDamage", "heroDamage", "goldAmount", "tapDamage", "criticalChance", "allDamage", "bossDamage"], skillValue:[0.4, 0.2, 0.25, 0.6, 0.2, 0.3, 0.1]},
        {id: 1033, name:"Dark Lord", dps:7.10E+135, cost:"4.56E+156", freq: 1000,skillType:["heroDamage", "tapDamage", "tapDPS", "goldAmound", "allDamage", "allDamage", "allDamage"], skillValue:[20.0, 0.2, 0.01, 0.25, 0.2, 0.3, 0.4]}
    ];

    Game.ITEM_LIST = {
        "storm": {
            id: 1001,
            name: "天降黄金",
            desc: "获得黄金",
            cd: 10,
            duration: 0,
            cost: 100
        },
        "doom": {
            id: 1002,
            name: "秒杀",
            desc: "秒杀当前怪物",
            cd: 10,
            duration: 0,
            cost: 50
        },
        "holding": {
            id: 1003,
            name: "坚持神力",
            desc: "让你每秒点击30下，效果持续",
            //cd0秒 启动之后还可以继续启动 这时叠加时间
            cd: 0,
            duration: 120,
            cost: 100
        },
        "shield": {
            id: 1004,
            name: "守卫护盾",
            desc: "所有英雄获得24小时免疫死亡效果",
            cd: 86400,
            duration: 86400,
            cost: 100
        },
        "refresh": {
            id: 1005,
            name: "技能刷新",
            desc: "重置所有主角技能冷却时间",
            cd: 10,
            duration: 10,
            cost: 120
        }
    };

    Game.ARTIFACT_LIST = {
        "savior": {
            id: 1023,
            name: "正义之盾",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 1.7,
            effect: "bossTime",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%与魔王的战斗时间";},
            description: "集正义之力打造的正义之盾，是有效抵挡魔王伤害的强大神器。",
            weight: 50
        },
        "fissure": {
            id: 1015,
            name: "太阳井能量",
            maxLevel: -1,
            baseDamage: 0.6,
            incrementDamage: 0.6,
            costX: 0.5,
            costY: 1.7,
            effect: "warCryDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%冲锋号角持续时间";},
            description: "太阳井是覆盖整个奎尔萨拉斯地域的强大魔法能量的储存器。它是由高等精灵们利用从永恒之井中取出的一瓶圣水制造的，蕴含着巨大的魔法能量。",
            weight: 50
        },
        "tincture": {
            id: 1004,
            name: "霜之哀伤",
            maxLevel: -1,
            baseDamage: 0.05,
            incrementDamage: 0.05,
            costX: 0.6,
            costY: 2.5,
            effect: "DPS",
            efFunc: function(level) { return level * 0.05; },
            efDesc: function(level) { return "+" + (level * 5) + "%所有攻击力额外加成";},
            description: "霜之哀伤的持有者将获得永恒的力量，然而也将付出代价：“剑锋饮血之时，亦将重创灵魂。”",
            weight: 25
        },
        "valrunes": {
            id: 1001,
            name: "恶魔之魂",
            maxLevel: -1,
            baseDamage: 0.25,
            incrementDamage: 0.25,
            costX: 0.7,
            costY: 2,
            effect: "mobGold",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%怪物黄金"; },
            description: "巨龙之魂聚集了几大守护巨龙的力量，守护着艾泽拉斯最强大的怪兽宝藏。",
            weight: 40
        },
        "hammer": {
            id: 1007,
            name: "蛋刀",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 1.7,
            effect: "tapDamage",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%点击攻击力"; },
            description: "相传这是在一万年前的上古之战中，从末日守卫军官手中缴获，具有无法想象的攻击力。",
            not_for_sale: true,
            weight: 0
        },
        "chalice": {
            id: 1013,
            name: "古尔丹之颅",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 1.7,
            effect: "goldx10Chance",
            efFunc: function(level) { return level * 0.005; },
            efDesc: function(level) { return "+" + (level * 0.5).toFixed(1) + "%10倍黄金几率";},
            description: "曾经强大兽人首领古尔丹，为了得到萨格拉斯力量的秘密，进入远古地牢的大门后被大门后面的恶魔撕碎。古尔丹死了，而他的魔法能量却奇迹般地留存在他的头颅里面。",
            weight: 10
        },
        "pendant": {
            id: 1028,
            name: "矿工护身符",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.7,
            costY: 1.5,
            effect: "handOfMidasCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%黄金风暴冷却时间"; },
            description: "地精专用的护身符，能让她们在挖掘矿石时能更大几率地找到黄金。",
            weight: 50
        },
        "seeker": {
            id: 1017,
            name: "末日亡灵",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 2,
            effect: "criticalChance",
            efFunc: function(level) { return level * 0.02; },
            efDesc: function(level) { return "+" + (level * 2) + "%暴击几率"; },
            description: "由暗黑精灵打造的封存了大量亡灵力量创造出来的特级武器。",
            weight: 40
        },
        "thrust": {
            id: 1003,
            name: "灰烬使者",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 1.7,
            effect: "criticalDamage",
            efFunc: function(level) { return level * 0.2; },
            efDesc: function(level) { return "+" + (level * 20) + "%暴击伤害"; },
            description: "曾经的血色十字军领袖之剑，拥有着神秘而强大的力量。",
            weight: 40
        },
        "fortune": {
            id: 1018,
            name: "未来的财富",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 2,
            effect: "goldCollection",
            efFunc: function(level) { return level * 0.05; },
            efDesc: function(level) { return "+" + (level * 5) + "%获得金币数量比例"; },
            description: "月之女神指引的藏于密林中的财富宝藏。",
            weight: 10
        },
        "opulence": {
            id: 1002,
            name: "萨格拉斯之眼",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.7,
            costY: 1.7,
            effect: "handOfMidasDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%黄金风暴持续时间"; },
            description: "拥有撕裂诺森德大陆力量的强大神器，并能产生强大的黄金风暴。",
            weight: 50
        },
        "mettle": {
            id: 1022,
            name: "战士勇气",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.4,
            costY: 1.5,
            effect: "berserkerRageDuration",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%巨龙怒吼冷却时间"; },
            description: "月之女神为正义的战士打造的神奇药剂，能让战士在一定时间内充满了力量。",
            weight: 50
        },
        "lotion": {
            id: 1016,
            name: "影魔药剂",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.4,
            costY: 1.5,
            effect: "shadowCloneCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%旋风斩冷却时间"; },
            description: "由德鲁伊战士发明的，充满了大自然精华的药剂，服用后能迅速恢复体力。",
            weight: 50
        },
        "elixir": {
            id: 1020,
            name: "矮人的灵药",
            maxLevel: -1,
            baseDamage: 0.2,
            incrementDamage: 0.2,
            costX: 0.5,
            costY: 1.8,
            effect: "goldPlaying",
            efFunc: function(level) { return level * 0.15; },
            efDesc: function(level) { return "+" + (level * 15) + "%游戏期间获得金币数量比例"; },
            description: "爱财的矮人发明的神奇药剂，能够让你充满了对财富的灵感，轻易获得更多财富。",
            weight: 50
        },
        "resolution": {
            id: 1005,
            name: "毁灭之锤",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.5,
            costY: 1.7,
            effect: "berserkerRageDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%巨龙怒吼持续时间"; },
            description: "部落酋长奥格瑞姆在解救敦霍尔德监狱兽人俘虏的战斗中受到伏击，生命垂危。临死前把自己的黑色战锤交给了萨尔，宣布其为新的部落大酋长。",
            weight: 50
        },
        "aura": {
            id: 1014,
            name: "泰兰德的回忆",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 2,
            effect: "evolutionBonus",
            efFunc: function(level) { return level * 0.05; },
            efDesc: function(level) { return "+" + (level * 5) + "%进化时获得的额外荣誉"; },
            description: "封存着大恶魔的伊利丹对月之女祭司泰兰德的美好回忆的风干玫瑰。",
            weight: 10
        },
        "egg": {
            id: 1027,
            name: "魔王秘宝",
            maxLevel: -1,
            baseDamage: 0.2,
            incrementDamage: 0.2,
            costX: 1,
            costY: 1.5,
            effect: "chestChance",
            efFunc: function(level) { return level * 0.02; },
            efDesc: function(level) { return "+" + (level * 20) + "%金币宝箱几率"; },
            description: "获得魔王秘宝的典籍能够让你得到大量财富。",
            weight: 10
        },
        "parchment": {
            id: 1012,
            name: "群星之怒",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.5,
            costY: 1.7,
            effect: "criticalStrikeDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%嗜血斩击持续时间"; },
            description: "索利达尔在太阳之井中沐浴多年，吸收了无尽的魔法能量之后拥有了传奇般的能力。在它张开弓弦时就会自动制造魔法箭矢，不需要装备弹药。",
            weight: 50
        },
        "cloak": {
            id: 1009,
            name: "龙父之牙",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 2,
            effect: "bossLife",
            efFunc: function(level) { return -0.02 * level; },
            efDesc: function(level) { return "-" + (level * 2) + "%魔王生命力"; },
            description: "黑龙王子用父亲的龙牙制成的匕首，威力无比，是一件能震慑魔王的神器。",
            weight: 25
        },
        "shield": {
            id: 1010,
            name: "巨龙之怒",
            maxLevel: -1,
            baseDamage: 0.3,
            incrementDamage: 0.3,
            costX: 0.7,
            costY: 1.5,
            effect: "bossGold",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + (level * 100) + "%魔王黄金"; },
            description: "牺牲了的蓝龙的寄魂之杖，得到这个神器就如同跟蓝龙合体，得到蓝龙的强大法力。",
            weight: 10
        },
        "contentment": {
            id: 1029,
            name: "魅魔的赏赐",
            maxLevel: -1,
            baseDamage: 0.2,
            incrementDamage: 0.2,
            costX: 1,
            costY: 1.5,
            effect: "chestGold",
            efFunc: function(level) { return level * 0.2; },
            efDesc: function(level) { return "+" + (level * 20) + "%宝箱金币"; },
            description: "魅魔总是喜欢给凡人赏赐财宝以更容易控制其心智。",
            weight: 10
        },
        "ointment": {
            id: 1025,
            name: "巫医药膏",
            maxLevel: 10,
            baseDamage: 0.6,
            incrementDamage: 0.6,
            costX: 0.4,
            costY: 1.5,
            effect: "warCryCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%冲锋号角的冷却时间"; },
            description: "巫医药膏能让所有使用的英雄迅速恢复神勇无比的战斗状态。",
            weight: 50
        },
        "gauntlet": {
            id: 1011,
            name: "影之哀伤",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.5,
            costY: 1.7,
            effect: "shadowCloneCD",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%旋风斩持续时间"; },
            description: "它诞生于神圣和堕落的力量当中，束缚着一千个亡魂，只有艾泽拉斯最强健的武器大师才能将其挥动。",
            weight: 50
        },
        "charm": {
            id: 1019,
            name: "魔王之戒",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 1.7,
            effect: "upgradeCost",
            efFunc: function(level) { return -0.02 * level; },
            efDesc: function(level) { return "-" + (level * 2) + "%升级花费"; },
            description: "拥有魔王之戒能让你轻易获得强大的战斗力。",
            weight: 40
        },
        "scroll": {
            id: 1021,
            name: "圣骑之盾",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.4,
            costY: 1.5,
            effect: "criticalStrikeCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%嗜血斩击的冷却时间"; },
            description: "能让战士获得强大的保护，并大量缩短战士的恢复时间与提升战斗力。",
            weight: 50
        },
        "saintly": {
            id: 1026,
            name: "贤者之盾",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.3,
            costY: 1.5,
            effect: "heavenlyStrikeCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%战士狂怒的冷却时间"; },
            description: "贤者之盾能帮助战士在最短的时间内恢复强大的能量使用必杀技。",
            weight: 50
        },
        "revival": {
            id: 1008,
            name: "橡木之斧",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 1,
            costY: 2.2,
            effect: "reviveTime",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%英雄重生时间"; },
            description: "由森林之王半神赛纳留斯和玛法里奥亲手为布洛克斯铸造的，一把拥有着完美平衡性的橡木之斧，这等殊荣凡人岂可有之。",
            weight: 25
        },
        "worldly": {
            id: 1006,
            name: "大皇家之剑",
            maxLevel: 5,
            baseDamage: 1.5,
            incrementDamage: 1.5,
            costX: 0.6,
            costY: 3,
            effect: "mobCount",
            efFunc: function(level) { return -1 * level; },
            efDesc: function(level) { return "-" + level + "个关卡怪物"; },
            description: "洛萨使用的武器，在跟毁灭之锤对垒时被折断，之后的去向无人知晓……",
            weight: 40
        },
        "armor": {
            id: 1024,
            name: "蛋盾",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 1,
            costY: 2.2,
            effect: "deathChance",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%英雄死亡几率"; },
            description: "相传这是在一万年前的上古之战中，从末日守卫军官手中缴获，是防护英雄最好的神器，没有之一。",
            not_for_sale: true,
            weight: 0
        },
        "indian": {
            id: 1030,
            name: "狂野之血",
            maxLevel: 10,
            baseDamage: 0.45,
            incrementDamage: 0.45,
            costX: 80,
            costY: 2,
            effect: "powerOfHoldingDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%坚持神力持续时间"; },
            description: "饮用之前摇一摇，喝了之后猛如虎，效果堪比“印度神油”！",
            not_for_sale: true,
            only_lottery: true,
            weight: 10
        },
        "stagejump": {
            id: 1031,
            name: "越级弹簧",
            maxLevel: 1000,
            baseDamage: 0,
            incrementDamage: 0.45,
            costX: 1,
            costY: 2,
            effect: "stageJump",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + level + "初始关卡"; },
            description: "跳级能手，从1直升100不是梦。",
            not_for_sale: true,
            only_lottery: true,
            weight: 25
        },
        "autoclick": {
            id: 1032,
            name: "风行合剂",
            maxLevel: 10,
            baseDamage: 0.45,
            incrementDamage: 0.45,
            costX: 80,
            costY: 2,
            effect: "autoClick",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + level + "次每秒自动点击"; },
            description: "喝了之后根本停不下来！",
            not_for_sale: true,
            only_lottery: true,
            weight: 10
        },
        "evobonus": {
            id: 1033,
            name: "狡诈护符",
            maxLevel: 1000,
            baseDamage: 0.30,
            incrementDamage: 0.30,
            costX: 1,
            costY: 2,
            effect: "goldAfterReborn",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + level + "关怪物掉落的初始金币"; },
            description: "用于英雄转生后的初始启动金币获取。",
            not_for_sale: true,
            only_lottery: true,
            weight: 10
        },
        "autostage": {
            id: 1034,
            name: "月虎披风",
            maxLevel: 210,
            baseDamage: 0.30,
            incrementDamage: 0.30,
            costX: 1,
            costY: 2,
            effect: "autoStage",
            efFunc: function(level) {
                if (!level || level < 0) {
                    return 0;
                }
                else {
                    return 240 - (level - 1);
                }
            },
            efDesc: function(level) {
                if (!level || level < 0) {
                    return "";
                }
                else {
                    return "+" + (240 - (level - 1)) + "秒下线自动跳关速度";
                }
            },
            description: "玩家离线后，通过自身攻击力，可以离线过关，获得更大的挂机升级效果。",
            not_for_sale: true,
            only_lottery: true,
            weight: 5
        }
    };

    Game.STAGE_LIST = {
        1:{"id":"1","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        2:{"id":"2","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        3:{"id":"3","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        4:{"id":"4","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        5:{"id":"5","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        6:{"id":"6","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        7:{"id":"7","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        8:{"id":"8","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        9:{"id":"9","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        10:{"id":"10","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        11:{"id":"11","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        12:{"id":"12","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        13:{"id":"13","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        14:{"id":"14","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        15:{"id":"15","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        16:{"id":"16","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        17:{"id":"17","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        18:{"id":"18","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        19:{"id":"19","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        20:{"id":"20","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        21:{"id":"21","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        22:{"id":"22","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        23:{"id":"23","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        24:{"id":"24","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        25:{"id":"25","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        26:{"id":"26","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        27:{"id":"27","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        28:{"id":"28","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        29:{"id":"29","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        30:{"id":"30","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        31:{"id":"31","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        32:{"id":"32","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        33:{"id":"33","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        34:{"id":"34","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        35:{"id":"35","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        36:{"id":"36","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        37:{"id":"37","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        38:{"id":"38","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        39:{"id":"39","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        40:{"id":"40","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        41:{"id":"41","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        42:{"id":"42","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        43:{"id":"43","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        44:{"id":"44","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        45:{"id":"45","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        46:{"id":"46","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        47:{"id":"47","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        48:{"id":"48","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        49:{"id":"49","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        50:{"id":"50","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010}
    };

    Game.ACHIVEMENT_LIST = {

    };

    Game.MONSTER_LIST = {
        10001: {id: 10001, name: "黑龙"},
        10003: {id: 10003, name: "蚊子"},
        10004: {id: 10004, name: "不撸"},
        10005: {id: 10005, name: "拉加克斯"},
        10006: {id: 10006, name: "莫阿木"},
        10007: {id: 10007, name: "58"},
        10008: {id: 10008, name: "斯可拉姆"},
        10009: {id: 10009, name: "沙尔吐拉"},
        10010: {id: 10010, name: "维希杜斯"},
        10011: {id: 10011, name: "双子哥"},
        10012: {id: 10012, name: "奥塞罗"},
        10013: {id: 10013, name: "克苏"},
        10014: {id: 10014, name: "鲁西弗龙"},
        10015: {id: 10015, name: "玛格蛮达"},
        10016: {id: 10016, name: "甲尔"},
        10017: {id: 10017, name: "元素"},
        10018: {id: 10018, name: "谷磊曼格"},
        10019: {id: 10019, name: "螺丝"},
        10020: {id: 10020, name: "勒什勒尔"},
        10021: {id: 10021, name: "宝箱"},
        10022: {id: 10022, name: "双子弟"}
    };

    //将数值转换成 K M T B aa 等文字显示格式
    Game.formatNumber = function(num) {
        var count = 0;
        while(num >= 1000)
        {
            num /= 1000;
            count++;
        }
        num = +(num).toFixed(2);

        var exp = "E+" + count*3;
        if(count < 31)
        {
            if(count == 0) {
                exp = "";
            } else if(count == 1) {
                exp = "K";
            } else if(count == 2) {
                exp = "M";
            } else if(count == 3) {
                exp = "B";
            } else if(count == 4) {
                exp = "T";
            } else {
                exp = String.fromCharCode(97 + count - 5) + String.fromCharCode(97 + count - 5);
            }
        }

        return num + exp
    };
}(hGame006));