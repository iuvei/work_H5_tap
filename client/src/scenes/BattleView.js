var SceneTabRender = [
    TankBox, HeroBox, ArtifactBox, DiamondBox
];
//操作界面的类型
var SceneTabListDataType = [
    "tank",
    "heros",
    "artifacts",
    "items"
];

var sceneTabIndex = {
    TankBox: 0,
    HeroBox: 1,
    ArtifactBox: 2,
    DiamondBox: 3
};

//*过关动画的类型
var BgCloseActionType = {
    NORMAL: "normal",//*普通过关
    REBORN: "reborn"//*转生
};

var BattleView = (function (_super) {
    // constructor
    function BattleView() {
        BattleView.super(this);

        this.actorTank = null;
        this.actorHeros = {};
        this.actorMob = null;

        this.selected = SceneTab.TAB_NULL;
        this.sceneTab = new SceneTab([
            [this.tabTank, this.tabTank2],
            [this.tabHero, this.tabHero2],
            [this.tabArtifact, this.tabArtifact2],
            [this.tabDiamond, this.tabDiamond2]
        ]);
        this.skillTab = new SkillTab([
            [this.Sprite_heavenlyStrike, this.heavenlyStrike, "heavenlyStrike", this.skillTimeText_1],
            [this.Sprite_shadowClone, this.shadowClone, "shadowClone", this.skillTimeText_2],
            [this.Sprite_criticalStrike, this.criticalStrike, "criticalStrike", this.skillTimeText_3],
            [this.Sprite_warCry, this.warCry, "warCry", this.skillTimeText_4],
            [this.Sprite_berserkerRage, this.berserkerRage, "berserkerRage", this.skillTimeText_5],
            [this.Sprite_handOfMidas, this.handOfMidas, "handOfMidas", this.skillTimeText_6]
        ]);
        this.sceneTabContent = new Array(SceneTab.TAB_MAX);
        this.dpsTab = new DpsTab([
            [this.currentDPSLabel,"currentDPSLabel"],
            [this.tapDPSLabel,"tapDPSLabel"],
            [this.heroDPSLabel,"heroDPSLabel"]
        ]);
    }

    // inherit class
    Laya.class(BattleView, "BattleView", _super);

    // prototype
    BattleView.prototype.init = function() {
        var self = this;
        this._isUseHandOfMidas = false;

        var player = App.player;

        this._upLvRate = 0;     //升级的倍率
        this._rateBtnStartPosList = [];
        this._isDoUpLvRate = true;
        for(var i = 0 ; i < 4 ; i++){
            var ratebtn = self[ "rateBtn" + i ];
            this._rateBtnStartPosList.push(Point.p(ratebtn.x,ratebtn.y));
        }

        this._topUI = this.getChildByName("Top");
        this._topUI.visible = true;

        this._monsterBox = this.getChildByName("Monster");
        this._monsterBox.visible = true;
        //初始化金币的Label
        this.copper.anchorX = 1;

        this._makeFairyCDTime = 0;
        this._idMakeFairy = false;

        this._cdRelicsVisible = 0;
        this._cdDiamondVisible = 0;
        var diamondPos = this._monsterBox.localToGlobal(Point.p(this.diamond.x,this.diamond.y));
        var relicsPos = this._monsterBox.localToGlobal(Point.p(this.relics.x,this.relics.y));
        this._diamondPos = Point.p(diamondPos.x,diamondPos.y);
        this._relicsPos = Point.p(relicsPos.x,relicsPos.y);

        this._skillsBox = this.getChildByName("Skills");
        this._skillsBox.visible = true;
        this._skillsBox.zOrder = 10;

        this._chargepropBox = this.getChildByName("Chargeprop");
        this._chargepropBox.zOrder = 10;

        this._levelInfoView = new LevelInfoDialog();
        this.levelIconNode.addChild(this._levelInfoView);

        this.updateLevelShow(player.stage.getLevel());
        this.updateBossNum();

        this.createCoinLayer();
        this.createTank();
        this.createHero();
        this.createMonster();
        this.initTabBox();
        this.initEvent();
        this.setUpLvRate(0);
        this.updateGold();
        //*离线金币
        this.checkOffLineGold();
        //*初始化技能快捷使用
        this.skillTab.initSkillTab();
        this.dpsTab.initValueShow();
    };

    BattleView.prototype.initTabBox = function () {
        var player = App.player;
        for (var tabIndex = 0; tabIndex < SceneTab.TAB_MAX; tabIndex++) {
            var array = [];
            var listData = null;
            var list = new laya.ui.List();
            var render = SceneTabRender[tabIndex] || new laya.ui.Box();

            switch (tabIndex) {
                case sceneTabIndex.TankBox: {
                    array = this.getTankBoxItemArray();
                    break;
                }

                case sceneTabIndex.HeroBox: {
                    listData = player[SceneTabListDataType[tabIndex]];
                    for(var k in listData){
                        var heroInfo = listData[k];
                        if(heroInfo.level == 0){
                            array.push(heroInfo);
                            break;
                        }
                        array.push(heroInfo);
                    }
                    break;
                }

                case sceneTabIndex.ArtifactBox: {
                    array = this.getArtifactBoxItemArray();
                    break;
                }

                case sceneTabIndex.DiamondBox: {
                    listData = player[SceneTabListDataType[tabIndex]];
                    for(var k in listData){
                        array.push(listData[k]);
                    }
                    break;
                }
            }

            list.array = array;
            list.itemRender = render || new laya.ui.Box();

            list.x = this.boxTabView.x;
            list.y = this.boxTabView.y;
            list.width = this.boxTabView.width;
            list.height = this.boxTabView.height;

            list.spaceY = 10;
            list.vScrollBarSkin = "";

            list.renderHandler = render.renderHandler ? new Laya.Handler(render, render.renderHandler) : null;

            this.sceneTabContent[tabIndex] = list;
        }
    };

    BattleView.prototype.getTankBoxItemArray = function () {
        var array = [];
        var player = App.player;
        //*主角
        var tankInfo = {
            "name": player.name,
            "type": TankBox.TYPE_TANK
        };
        array.push(tankInfo);
        //*技能
        var listData = player.skills;
        for(var skillIndex in listData){
            var skill = listData[skillIndex];
            var skillName = skill.getName();
            var skillInfo = {
                "type": TankBox.TYPE_SKILL,
                "name": skillName,
                "skin": "assets/icons/skills/square/" + skill.id + ".jpg",
                "skillName": skillIndex,
                "battleView": this
            };
            array.push(skillInfo);
        }
        //*转生
        var rebornItemsInfo = {
            "type": TankBox.TYPE_REBORN,
            "name": "进化",
            "skin": "assets/icons/skills/square/100107.jpg",
            "rebornLevel": Game.Game.TANK_REBORN_LEVEL,
            "rebornStage": Game.Game.TANK_REBORN_STAGE,
            "battleView": this
        };
        array.push(rebornItemsInfo);

        return array;
    };

    BattleView.prototype.getArtifactBoxItemArray = function () {
        var array = [];
        var artifacts = this.getArtifactArray();
        //*购买Item
        var buyInfo = {
            boxType: ArtifactBox.BOXTYPE_BUY
        };
        array.push(buyInfo);
        //*神器Item
        for (var index in artifacts) {
            var artifactInfo = {
                //*artifactKey这个key主要是用于删除的时候
                boxType: ArtifactBox.BOXTYPE_ARTIFACT,
                artifactObj: artifacts[index],
                artifactKey: artifacts[index].key
            };
            array.push(artifactInfo);
        }

        return array;
    };

    BattleView.prototype.getArtifactArray = function () {
        var artifacts = App.player.artifacts;
        var artifactsSortArray = [];
        var array = [];

        for (var index in artifacts) {
            artifactsSortArray[index] = artifacts[index];
        }

        array = artifactsSortArray.sort(this.sortArtifactByCreateTime);
        return array;
    };

    BattleView.prototype.sortArtifactByCreateTime = function (a,b) {
        var createTimeA = a.createTime;
        var createTimeB = b.createTime;
        if (createTimeA > createTimeB) {
            return 1;
        }
        else {
            return 0;
        }
    };

    BattleView.prototype.initEvent = function () {
        this.leaveBtn.on(Laya.Event.CLICK, this, this.onBossClick);
        this.bossBtn.on(Laya.Event.CLICK, this, this.onBossClick);

        this.offLineGoldBtn.on(Laya.Event.CLICK,this,function(){
            var offLineGold = new OffLineGoldDialog();
            App.uiManager.addUiLayer(offLineGold,true);
        });

        this.rateBtn.on(Laya.Event.CLICK, this, this.onShowUpLvRateShow);

        this.rateBtn0.on(Laya.Event.CLICK, this, this.setUpLvRate,[0]);
        this.rateBtn1.on(Laya.Event.CLICK, this, this.setUpLvRate,[1]);
        this.rateBtn2.on(Laya.Event.CLICK, this, this.setUpLvRate,[2]);
        this.rateBtn3.on(Laya.Event.CLICK, this, this.setUpLvRate,[3]);

        this.btnHide.on(Laya.Event.CLICK, this, this.onButtonHiddenClick);
        this.sceneTab.on(Laya.Event.SELECT, this, this.onSceneTabSelect);
        this.skillTab.on(SkillTab.USESKILL, this, this.onSkillUsed);
        this.skillTab.on(SkillTab.DELETE_EFFECT, this, this.onSkillLoseEfficacy);

        this.boxHeros.on(Laya.Event.CLICK, this, this.tankAttack);

        var player = App.player;
        player.on(Game.Player.UPDATEGOLD, this, this.updateGold);
        player.on(Game.Player.ADDCOIN, this, this.addCoin);
        player.on(Game.Player.UPDATEDIAMOND, this, this.updateDiamond);
        player.on(Game.Player.UPDATERELIC, this, this.updateRelics);
        player.on(Game.Player.UPDATEARTIFACT, this, this.updateArtifact);
        player.on(Game.Player.ADDARTIFACT, this, this.addArtifact);
        player.on(Game.Player.REMOVEARTIFACT, this, this.removeArtifact);
        player.on(Game.Player.ADDFAIRY, this, this.addFairy);

        App.uiManager.on(Narwhale.Event.Battle.CREATEHERO, this, this.createHeroAt);
        App.uiManager.on(Narwhale.Event.Battle.CHECKOFFLINEGOLD,this,this.checkOffLineGold);
        App.uiManager.on(Narwhale.Event.Battle.CREATEHEROITEM,this,this.createHeroItemAt);
        App.uiManager.on(Narwhale.Event.Battle.UPDATEHEROITEM,this,this.updateHeroItem);
        App.uiManager.on(Narwhale.Event.Battle.ADDNUMCOIN,this,this.addNumCoin);
        App.uiManager.on(Narwhale.Event.Battle.ADDAWARDBOX,this,this.addAwardBox);
        App.uiManager.on(Narwhale.Event.Battle.ADDFAIRYCOIN,this,this.addFairyCoin);

        //*转生更新显示
        this.on(TankBox.TANK_REBORN, this, this.tankReborn);

        Laya.timer.frameLoop(1, this, this.update);
        this.actorTank.on(ActorTank.USED_SKILL_HEAVENLYSTRIKE, this, this.tankUseHeavenlyStrike);
    };

    //*创建MT
    BattleView.prototype.createTank = function(){
        this.actorTank = new ActorTank(101);
        var sprite = this.spriteTank;
        sprite.visible = true;
        sprite.addChild(this.actorTank);
    };

    //创建所有英雄
    BattleView.prototype.createHero = function() {
        var heros = App.player.heros;

        for (var k in heros){
            var heroInfo = heros[k];

            if(heroInfo.level > 0){
                this.createHeroAt(heroInfo);
            }
        }
    };

    //创建某个英雄
    BattleView.prototype.createHeroAt = function(info) {
        var id = info.id;
        if(this.actorHeros[id]){
            return;
        }

        var sprite ;
        var hero = new ActorHero({id:id,info:info});
        sprite = this.boxHeros.getChildByName(String(hero.db.pos));
        sprite.visible = true;
        sprite.addChild(hero);
        this.actorHeros[id] = hero;
    };

    //*删除所有激活的英雄
    BattleView.prototype.removeAllActiveHeros = function () {
        for (var index in this.actorHeros) {
            var hero = this.actorHeros[index];
            hero.removeHero();
        }
    };

    //添加某个英雄ListItem
    BattleView.prototype.createHeroItemAt = function(index) {
        var heros = App.player.heros;
        var heroInfo = heros[index];
        if(heroInfo && heroInfo.level == 0){
            this.sceneTabContent[sceneTabIndex.HeroBox].addItem(heroInfo);
            this.sceneTabContent[sceneTabIndex.HeroBox].scrollTo(index);
        }
    };

    BattleView.prototype.createMonster = function(id){
        var player = App.player;
        var monster = player.stage.getMonster();

        var monsterId = id || monster.id;
        this.actorMob = new ActorMonster(monsterId);
        this.spriteMob.visible = true;
        this.spriteMob.addChild(this.actorMob);

        //根据关卡，更改怪物大小
        var scale = player.stage.getMonsterSize();
        this.actorMob.scale(0,0.5);
        //*怪物创建时候的缩放动画
        var scaleTo = ScaleTo.create(0.06, scale, scale);
        App.actionManager.runAction(scaleTo, this.actorMob);

        this.monsterInfoShow();
        monster.on(Game.Monster.DEAD, this, this.onMonsterDead);
        monster.on(Game.Monster.HURT, this, this.monsterInfoShow);
    };

    BattleView.prototype.delayCreateMonster = function () {
        var time = 300;
        var createMonsterFunc = function () {
            this.createMonster();
            this.updateBossNum();
        };
        Laya.timer.once(time, this, createMonsterFunc);
    };

    BattleView.prototype.onMonsterDead = function() {
        var self = this;
        var player = App.player;

        var route = "monster.kill";
        var data = {};

        App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            player.syncPlayer(data);
            player.stage.makeMonster();
            if (self.actorMob != null) {
                //*死亡特效
                var effect = SpineEffect.create(300001);
                if(effect != null){
                    self.spriteTank.addChild(effect);
                    effect.play();
                }

                if (self.actorMob) {
                    self.actorMob.removeSelf();
                }
                self.actorMob = null;
                self.delayCreateMonster();
            }

            //如果进度为0,过关后的相关界面更新
            var progress = player.stage.getProgress();
            if(progress == 0) {
                self.updateLevelShow(player.stage.getLevel());
            }

        }));
    };

    //更新金币
    BattleView.prototype.updateGold = function (goldNum){
        var player =　App.player;
        if(this._copperLab){
            this._copperLab.removeSelf();
            this._copperLab = null;
        }
        this._copperLab = new Laya.Label();
        this._copperLab.font = "white";
        this._copperLab.text = Narwhale.Config.formatNumber(player.gold);
        //this._copperLab.text = player.gold;
        this._copperLab.anchorX = 0.5;
        this._copperLab.anchorY = 0.5;
        this._copperLab.x = Laya.stage.width/2;
        this._copperLab.y = this.copper.y - 35;
        this._copperLab.align = "center";
        this._monsterBox.addChild(this._copperLab);
        this.copper.x = Laya.stage.width/2 - this._copperLab.width/2;

        var goldPos = this._monsterBox.localToGlobal(Point.p(this.copper.x,this.copper.y));
        this._goldPos = Point.p(goldPos.x,goldPos.y);

        this.updateListAtGold();
    };

    //根据金币刷新，刷新列表显示
    BattleView.prototype.updateListAtGold = function(){
        //刷新列表
        this.updateHeroItem();
        var TankCell = this.sceneTabContent[sceneTabIndex.TankBox].getCell(0);
        if(TankCell){
            TankCell.onRender(TankCell.dataSource);
        }
    };

    //距离以挑战boss的次数
    BattleView.prototype.updateBossNum = function(){
        var player = App.player ;
        var stage = player.stage;
        var mobCount = stage.getMobCount();
        var progress = stage.getProgress();
        this.bossNum.text =  (progress+1) + "/" + mobCount;

        var monster = stage.getMonster();

        if(progress >= mobCount){
            this._isOnBoss = true;
            this.leaveBtn.mouseEnabled = true;
            this.bossBtn.mouseEnabled = true;
            if( monster.isBoss() ){
                this.leaveBtn.visible = true;
                this.bossBtn.visible = false;
                this.mobTime.value = 1;

                this._bossTime = stage.getBossTime();
                this._bossCDTime = stage.getBossTime();
                this.mobCDTime.visible = true;
                this.mobCDTime.text = this._bossTime;

                this._killHeroInfo = monster.getKillHeroInfo();
            }
            else{
                this.leaveBtn.visible = false;
                this.bossBtn.visible = true;
                this.mobTime.value = 0;
                this._bossCDTime = 0;
                this.mobCDTime.visible = false;

                this._killHeroInfo = null;
                this._isDokill = false;

            }
        }
        else{
            this._isOnBoss = false;

            this.leaveBtn.visible = false;
            this.bossBtn.visible = false;
            this.mobTime.value = 0;
            this._bossCDTime = 0;
            this.mobCDTime.visible = false;

            this._killHeroInfo = null;
            this._isDokill = false;

        }

    };

    //过关后的相关界面更新
    BattleView.prototype.updateLevelShow = function(stage) {
        var index = Math.floor((stage - 1) % 50 / 5) + 1;
        var id = 10000 + index ;
        this.updateLevelIcon(stage);
        //暂时添加过关闭幕动画
        if(this._battleBgId && id && this._battleBgId != id){
            this.doBgClose({bgType: BgCloseActionType.NORMAL});
        }
        this.updateBattleBg(id);
    };

    //关卡推进动画
    BattleView.prototype.updateLevelIcon = function(index) {
        this._levelInfoView.changeIndex(index);
    };

    //更新战斗背景
    BattleView.prototype.updateBattleBg = function(id){
        if(id && this._battleBgId != id){
            this._battleBgId = id;

            this.background01.skin = "assets/maps/"+ id + "/bg001.jpg";

            this.background02.skin = "assets/maps/"+ id + "/bg002.png";

            this.background03.skin = "assets/maps/"+ id + "/bg003.png";

            this.background04.skin = "assets/maps/"+ id + "/bg004.png";

            this.background05.skin = "assets/maps/"+ id + "/bg005.png";

            this.background06.skin = "assets/maps/"+ id + "/bg006.png";
        }
    };

    //过关闭幕动画
    BattleView.prototype.doBgClose = function(bgInfo){
        //*动画显示的类型（普通过关，转生）
        var doBgCloseType = bgInfo.bgType || BgCloseActionType.NORMAL;
        var callback = bgInfo.callBack || function(){};
        var showText = "";

        //屏蔽层
        var colorLayer = new Laya.Sprite();
        colorLayer.alpha = 0;
        colorLayer.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#ffffff");
        this.addChild(colorLayer);
        var hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#ffffff");
        colorLayer.hitArea = hitArea;
        colorLayer.mouseEnabled = true;
        colorLayer.zOrder = 100;

        var levelTipView = new LevelTipBoxUI();
        colorLayer.addChild(levelTipView);
        levelTipView.x = Laya.stage.width/2 ;
        levelTipView.y = Laya.stage.height/4 ;

        if (doBgCloseType == BgCloseActionType.NORMAL) {
            var levelIndex = App.player.stage.getLevel();
            var table  = this._levelInfoView.getGameTabel(levelIndex);
            var nextStage = levelIndex + 1 ;
            var bgIndex = Math.floor((nextStage - 1)/50) + 1;
            if (bgIndex <= 1) {
                bgIndex = "";
            }
            showText = table.name + bgIndex;
        }
        else if (doBgCloseType == BgCloseActionType.REBORN) {
            showText = "进化";
        }

        var levelNameLab = levelTipView.levelNameLab;
        levelNameLab.text = showText;

        var fadeOutEnd = function(self){
            self.removeSelf();
        };

        var fadeInEnd = function(self,callback){
            callback();

            var act3 = FadeOut.create(1);
            var seq = Sequence.create(act3,CallFunc.create(Laya.Handler.create(this,fadeOutEnd,[self])));
            App.actionManager.runAction(seq,self);

        };
        var func = CallFunc.create(Laya.Handler.create(this,fadeInEnd,[colorLayer,callback]));

        var act1 = FadeIn.create(0.5);
        var act2 = DelayTime.create(2);
        var seq = Sequence.create(act1,act2,func);
        App.actionManager.runAction(seq,colorLayer);

    };

    //*点击攻击
    BattleView.prototype.tankAttack = function(msg) {
        if (!this.actorMob) {
            return;
        }
        //*动作表现
        this.actorTank.attack();
        this.actorMob.underAttack();

        var player = App.player;
        var damageObj = player.tap();
        this.damageValueShow(damageObj);

        if (this._isUseHandOfMidas) {
            this.tankUseHandOfMidas();
        }
    };

    //*使用战士狂怒技能
    BattleView.prototype.tankUseHeavenlyStrike = function () {
        if (!this.actorMob) {
            return;
        }
        this.actorMob.underAttack();

        var player = App.player;
        var damageObj = player.heavenlyStrikeTap();
        this.damageValueShow(damageObj);

        if (this._isUseHandOfMidas) {
            this.tankUseHandOfMidas();
        }
    };
    
    BattleView.prototype.shadowCloneEffect = function () {
        if (!this.actorMob) {
            return;
        }
        this.actorMob.underAttack();

        var player = App.player;
        var damageObj = player.shadowCloneTap();
        this.damageValueShow(damageObj);
    };

    //*开启/关闭 影子战士
    BattleView.prototype.tankUesShadowClone = function (isOpen) {
        if (isOpen) {
            var player = App.player;
            var skill = player.skills["shadowClone"];
            if (skill.active()) {
                var effect = skill.getEffect();
                if(effect > 0){
                    var time = 1000/effect;
                    Laya.timer.loop(time, this, this.shadowCloneEffect);
                }
            }
        }
        else{
            Laya.timer.clear(this, this.shadowCloneEffect);
        }
    };

    //*使用黄金风暴技能
    BattleView.prototype.tankUseHandOfMidas = function () {
        var player = App.player;

        var route = "player.midas";
        var data = {};

        App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if (!err) {
                player.syncPlayer(data);
            }
        }));
    };

    BattleView.prototype.checkOffLineGold = function(){
        var player = App.player;
        var offlineGold = player.offlineGold;
        var visible = false;
        if (offlineGold) {
            visible = true;
        }
        this.offLineGoldBtn.visible = visible;
    };

    BattleView.prototype.monsterInfoShow = function () {
        var player = App.player;
        if(!player){
            return;
        }

        var stage = player.stage;
        var monster = stage.getMonster();
        //*血量显示
        var maxHealth = monster.maxHealth;
        var health = monster.health;
        var hpPercent = 1 - (health/maxHealth);
        var hpStr = Narwhale.Config.formatNumber(health);

        this.progressMobBlood.value = hpPercent;
        this.mobHealth.text = hpStr;

        this.mobName.text = monster.name || "怪物名字";
    };

    BattleView.prototype.damageValueShow = function (damageObj) {
        var damage = Narwhale.Config.formatNumber(damageObj.damage);
        var critical = damageObj.critical;

        var font = NumAction.getHurtNum(damage);
        this.spriteText.addChild(font);

        if(critical){
            //*暴击
            font.scaleX = 1.3;
            font.scaleY = 1.3;
        }
    };

    BattleView.prototype.onButtonHiddenClick = function() {
        this.boxTabContent.visible = false;
        this.sceneTab.reset();
        if (this.selected != SceneTab.TAB_NULL) {
            this.boxTabContent.removeChild(this.sceneTabContent[this.selected]);
        }

        this._skillsBox.zOrder = 10;
        this._chargepropBox.zOrder = 10;
    };

    BattleView.prototype.onSceneTabSelect = function(selectIndex) {
        this.boxTabContent.visible = true;
        if (this.selected != SceneTab.TAB_NULL) {
            this.boxTabContent.removeChild(this.sceneTabContent[this.selected]);
        }
        this.boxTabContent.addChild(this.sceneTabContent[selectIndex]);
        this.selected = selectIndex;

        this._skillsBox.zOrder = -1;
        this._chargepropBox.zOrder = -1;
    };

    //升级倍率按钮的缩放效果
    BattleView.prototype.onShowUpLvRateShow = function(){
        var self = this;

        this.rateBtn.mouseEnabled = false;

        var time = 0.1;
        var rate = 0.1;

        if(this._isDoUpLvRate){
            //收缩动作
            var Pos = Point.p(this.rateBtn.x,this.rateBtn.y);
            var count = 0;
            for(var i = 0 ; i < 4 ; i++){
                var ratebtn = self[ "rateBtn" + i ];
                var move = MoveTo.create(time,Pos);
                var fadeOut = FadeOut.create(time);
                var spawn = Spawn.create(move,fadeOut);
                var func = CallFunc.create(Laya.Handler.create(this,function(){
                    count++;
                    if(count == 4){
                        this.rateBtn.mouseEnabled = true;
                    }
                }));
                var seq = Sequence.create(spawn,func);
                App.actionManager.runAction(seq,ratebtn);
                time += rate;
            }
        }
        else{
            //扩放动作
            var count = 0;
            for(var i = 0 ; i < 4 ; i++){
                var ratebtn = self[ "rateBtn" + i ];
                var Pos = this._rateBtnStartPosList[i];
                var move = MoveTo.create(time,Pos);
                var fadeIn = FadeIn.create(time);
                var spawn = Spawn.create(move,fadeIn);
                var func = CallFunc.create(Laya.Handler.create(this,function(){
                    count++;
                    if(count == 4){
                        this.rateBtn.mouseEnabled = true;
                    }
                }));
                var seq = Sequence.create(spawn,func);
                App.actionManager.runAction(seq,ratebtn);
                time += rate;
            }
        }

        this._isDoUpLvRate = !this._isDoUpLvRate;
    };

    BattleView.prototype.updateHeroItem = function(){
        var heroCells = this.sceneTabContent[sceneTabIndex.HeroBox].cells;
        for(var k in heroCells){
            var cell = heroCells[k];
            cell.onRender(cell,cell._index);
        }
    };

    BattleView.prototype.deleteHeroItem = function () {
        var heroList  = this.sceneTabContent[sceneTabIndex.HeroBox];
        var heroListLength = heroList.length;
        for (var index = heroListLength - 1 ; index > 0 ; index--) {
            heroList.deleteItem(index);
        }
    };

    BattleView.prototype.updateTankBoxItem = function () {
        var tankBoxCells = this.sceneTabContent[sceneTabIndex.TankBox].cells;
        for (var index in tankBoxCells) {
            var cell = tankBoxCells[index];
            cell.onRender(cell.dataSource);
        }
    };

    //*更新神器信息
    BattleView.prototype.updateArtifact = function (artifactKey) {
        var artifactList = this.sceneTabContent[sceneTabIndex.ArtifactBox];
        artifactList.refresh();
    };

    //*添加神器
    BattleView.prototype.addArtifact = function (artifactKey) {
        if (!artifactKey) {
            return;
        }
        var player = App.player;
        var artifact = player.findArtifact(artifactKey);
        var artifactList = this.sceneTabContent[sceneTabIndex.ArtifactBox];
        if (artifact) {
            var artifactInfo = {
                boxType: ArtifactBox.BOXTYPE_ARTIFACT,
                artifactObj: artifact,
                artifactKey: artifactKey
            };

            artifactList.addItem(artifactInfo);
        }
    };

    //*删除神器
    BattleView.prototype.removeArtifact = function (artifactKey) {
        var artifactList = this.sceneTabContent[sceneTabIndex.ArtifactBox];
        var artifactListLength = artifactList.length;
        var delArtifactIndex = 0;
        for (var index  = artifactListLength - 1; index > 0; index--) {
            var dataSource = artifactList.getItem(index);
            var key = dataSource.artifactKey;
            if (key && key == artifactKey) {
                delArtifactIndex = index;
                break;
            }
        }

        if (delArtifactIndex > 0) {
            artifactList.deleteItem(delArtifactIndex);
            artifactList.refresh();
        }
    };

    BattleView.prototype.setUpLvRate = function(index){
        switch (index){
            case 0 :{
                this._upLvRate = 1;
                break;
            }
            case 1 :{
                this._upLvRate = 10;
                break;
            }
            case 2 :{
                this._upLvRate = 100;
                break;
            }
            case 3 :{
                this._upLvRate = 1000;
                break;
            }
        }
        var self = this;
        for(var i = 0 ; i < 4 ; i++){
            var ratebtn = self[ "rateBtn" + i ];
            if(index == i){
                ratebtn.skin = "assets/ui.scene/btn2_3.png";
            }
            else{
                ratebtn.skin = "assets/ui.scene/btn2_1.png";
            }
        }

        if(this._upLvRate < 1000){
            this.rateBtn.label = "x" + this._upLvRate;
        }
        else{
            this.rateBtn.label = "Max";
        }

        this.updateListAtGold();
    };

    BattleView.prototype.getUpLvRate = function(){
        return this._upLvRate;
    };

    BattleView.prototype.getDiamondPos = function(){
        return this._diamondPos;
    };

    BattleView.prototype.getRelicsPos = function(){
        return this._relicsPos;
    };

    BattleView.prototype.getGoldPos = function(){
        return this._goldPos;
    };

    //挑战魔王
    BattleView.prototype.onBossClick = function(){
        if(this._isOnBoss){
            var self = this;
            var player = App.player;

            var route = "stage.paused";
            var data = {};

            App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
                player.syncPlayer(data);
                player.stage.makeMonster();

                if (self.actorMob) {
                    self.actorMob.removeSelf();
                }
                self.actorMob = null;
                self.delayCreateMonster();
            }));

            this.leaveBtn.mouseEnabled = false;
            this.bossBtn.mouseEnabled = false;
        }
        else{
            console.log("不可切换无限挑战boss");
            //注意，如果是不在挑战Boss,切换以上的stage.paused接口，会导致无限挑战（无法过关）；
        }
    };

    //*技能使用
    BattleView.prototype.onSkillUsed = function (skillName) {
        var gameSkillList = Game.Game.SKILL_NAMELIST;
        if (gameSkillList.indexOf(skillName) == -1) {
            return;
        }

        if (skillName == "handOfMidas") {
            //*黄金风暴效果标记开启
            this._isUseHandOfMidas = true;
        }
        else if (skillName == "shadowClone") {
            //*影子战士效果开启
            this.tankUesShadowClone(true);
        }

        //*动作表现
        this.actorTank.doSkillAction(skillName);
    };

    //*技能失效
    BattleView.prototype.onSkillLoseEfficacy = function (skillName) {
        if (!skillName ) {
            return;
        }

        if (skillName == "handOfMidas") {
            //*黄金风暴效果标记取消
            this._isUseHandOfMidas = true;
        }
        else if (skillName == "shadowClone") {
            //*影子战士效果取消
            this.tankUesShadowClone(false);
        }

        //*删除tank身上的特效表现
        this.actorTank.removeSkillEffect(skillName);
    };

    //创建资源货币掉落层
    BattleView.prototype.createCoinLayer = function () {
        this._coinLayer = new Laya.Sprite();
        this._coinLayer.zOrder = 10;
        this.addChild(this._coinLayer);

        //精灵下落层
        this._fariyLayer = new Laya.Sprite();
        this._coinLayer.addChild(this._fariyLayer);

        //金币掉落，与离线金币掉落层
        this._goldCoinLayer = new GoldCoinLayer();
        this._coinLayer.addChild(this._goldCoinLayer);

        //钻石，荣誉，物品掉落层
        this._diamondCoinLayer = new DiamondCoinLayer();
        this._coinLayer.addChild(this._diamondCoinLayer);

        //资源掉落的数值显示层
        this._numCoinLayer = new NumCoinLayer();
        this._coinLayer.addChild(this._numCoinLayer);
    };

    //添加资源货币显示
    BattleView.prototype.addCoin = function (uuid) {
        var player = App.player;
        var coinInfo = player.findCoin(uuid);
        var coinType = coinInfo.getType();

        switch (coinType){
            case  Game.Coin.TYPE_GOLD :{
                //金币
                this._goldCoinLayer.addGold(coinInfo);

                //离线金币
                //this._goldCoinLayer.addOffLineGold();

                break;
            }

            case  Game.Coin.TYPE_DIAMOND :{
                this._diamondCoinLayer.addDiamond(coinInfo);

                break;
            }

            case  Game.Coin.TYPE_RELICS :{
                this._diamondCoinLayer.addRelics(coinInfo);

                break;
            }
        }

    };

    //添加精灵资源货币显示
    BattleView.prototype.addFairyCoin = function (uuid,pos) {
        var player = App.player;
        var coinInfo = player.findCoin(uuid);
        var coinType = coinInfo.getType();
        switch (coinType){
            case  Game.Coin.TYPE_GOLD :{
                //金币
                this._goldCoinLayer.addGold(coinInfo,pos);
                break;
            }

            case  Game.Coin.TYPE_DIAMOND :{
                this._diamondCoinLayer.addDiamond(coinInfo,pos);
                break;
            }

            case  Game.Coin.TYPE_RELICS :{
                this._diamondCoinLayer.addRelics(coinInfo,pos);
                break;
            }
        }
    };

    //添加资源掉落的数值显示
    BattleView.prototype.addNumCoin = function (num,pos) {
        this._numCoinLayer.addNumCoin(pos,num);
    };

    //添加精灵显示
    BattleView.prototype.addFairy = function (uuid) {
        var player = App.player;
        var fairyInfo = player.findFairy(uuid);
        var fairy = new ActorFariy({id:9999,info:fairyInfo});
        this._fariyLayer.addChild(fairy);
        fairy.x = Math.random() * 320  + 160;
        fairy.y = -50;
        fairy.doAction();
    };

    //添加精灵奖励宝箱
    BattleView.prototype.addAwardBox = function (info,pos,dir) {
        if(!info){
            return;
        }

        var awardBox = new ActorAwardBox({id:9999,info:info});
        this._fariyLayer.addChild(awardBox);
        awardBox.pos(pos.x,pos.y);
        awardBox.setDir(dir);
        awardBox.doAction();
    };

    //申请精灵
    BattleView.prototype.makeFairy = function () {
        var player = App.player;

        var route = "fairy.make";
        var data = {};

        App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
            if(!err){
                player.syncPlayer(data);
                this._isMakeFairy = false;
            }else{
                this._isMakeFairy = false;
            }
        }));

        //如果没有申请成功，就一段时间改回可以申请状态（5s后）
        var changeIsMakeFairy = function(){
            if(this._isMakeFairy == true){
                this._isMakeFairy = false
            }
        };
        Laya.timer.once(5000, this, changeIsMakeFairy);

    };

    BattleView.prototype.update = function () {
        var dt = Laya.timer.delta/1000;

        //显示钻石
        if(this._cdDiamondVisible){
            this._cdDiamondVisible -= dt;
            if(this._cdDiamondVisible <= 0){
                this._cdDiamondVisible = 0;
                this.diamondNumLab.visible = false;
                this.diamond.visible = false;
            }
            else{
                this.diamondNumLab.visible = true;
                this.diamond.visible = true;
            }
        }
        //显示荣誉
        if(this._cdRelicsVisible){
            this._cdRelicsVisible -= dt;
            if(this._cdRelicsVisible <= 0){
                this._cdRelicsVisible = 0;
                this.relicsNumLab.visible = false;
                this.relics.visible = false;
            }
            else{
                this.relicsNumLab.visible = true;
                this.relics.visible = true;
            }
        }

        //挑战boss倒计时
        if(this._bossCDTime){
            this._bossCDTime -= dt;
            if(this._bossCDTime <= 0){
                this._bossCDTime = 0;
                this.mobTime.value = 0;

                this.onBossClick();
            }
            else{
                var value = this._bossCDTime.toFixed(1);
                this.mobCDTime.text = value;
                this.mobTime.value = this._bossCDTime/this._bossTime;

                if(this._killHeroInfo){
                    var heroDietime = Math.ceil(this._bossCDTime);
                    if(!this._isDokill && heroDietime == (this._bossTime - this._killHeroInfo.deadTime) ){
                        this._isDokill = true;
                        this.dokillHero();
                    }
                }
            }
        }

        //申请精灵
        this._makeFairyCDTime += dt;
        if(this._makeFairyCDTime >= 1){
            this._makeFairyCDTime = 0;
            var player = App.player;
            var FairyStamp = player.getFairyStamp();

            var nowTime = App.getAsyncSecond();
            var diff = FairyStamp - nowTime;
            if(!this._isMakeFairy && diff <= 0){
                this._isMakeFairy = true;
                this.makeFairy();
            }
        }
    };

    BattleView.prototype.dokillHero = function(){
        var player = App.player;

        var route = "hero.kill";
        var data = {};

        App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
            if(!err){

                player.syncPlayer(data);
                this.updateHeroItem();
            }else{
            }
        }));
    };

    BattleView.prototype.updateDiamond = function () {
        this._cdDiamondVisible = 3;
        var player = App.player;
        this.diamondNumLab.text = player.diamond ;
    };

    BattleView.prototype.updateRelics = function () {
        this._cdRelicsVisible = 3;
        var player = App.player;
        this.relicsNumLab.text = player.relics ;
    };

    BattleView.prototype.tankReborn = function(){
        //*表演动作
        this.actorTank.doRebornAction();
        //*白幕
        this.doBgClose({bgType: BgCloseActionType.REBORN});
        //*重置英雄显示
        this.removeAllActiveHeros();
        //*英雄列表
        this.deleteHeroItem();
        this.updateHeroItem();
        //*技能列表
        this.updateTankBoxItem();
        //*技能列表置顶
        this.sceneTabContent[sceneTabIndex.TankBox].scrollTo(0);
        //*重置技能图标显示
        this.dpsTab.initValueShow();
        //*金币显示
        this.updateGold();
        //*关卡信息
        this.updateLevelShow(App.player.stage.getLevel());
        //*怪物
        App.player.stage.makeMonster();
        if (this.actorMob) {
            this.actorMob.removeSelf();
        }
        this.actorMob = null;
        this.createMonster();
        this.updateBossNum();
        //*tap close
        this.onButtonHiddenClick();
    };

    return BattleView;
}(BattleViewUI));