var TankBox = (function(_super) {
    function TankBox() {
        TankBox.super(this);
        this.initEvent();
    }

    Laya.class(TankBox, "TankBox", _super);

    TankBox.prototype.initEvent = function () {
        this.btnUpgrade.on(Laya.Event.CLICK, this, this.touchUpgrade);
        this.backgroud.on(Laya.Event.CLICK, this, this.showBoxInfoPanel);
        App.player.on(Game.Player.LEVELCHANGE, this, this.setUpgradeBtnState);
        App.player.on(Game.Player.UPDATEGOLD, this, this.setUpgradeBtnState);
        App.player.on(Game.Player.UPDATEGOLD, this, this.setTankUpgradeState);
    };

    TankBox.renderHandler = function(cell, index) {
        cell.onRender(cell.dataSource,index);
    };

    TankBox.prototype.onRender = function(data) {
        if(!data){
            return;
        }

        //*信息显示
        this.renderBoxInfo(data);
        //*按钮状态设置
        this.setUpgradeBtnState();
    };

    TankBox.prototype.renderBoxInfo = function (sourceData) {
        var player = App.player;
        var playerSkills = player.skills;
        var playerLevel = player.level;
        var level = "";
        var levelStr = "";
        var desc = "";
        var cost = 0;
        var costStr = "";
        var valueStr = "";
        var messageStr = "";
        var skill = null;

        this.boxInfoType = sourceData.type;
        this.skillName = sourceData.skillName || "";
        this.battleView = sourceData.battleView || null;
        this.rebornLevel = sourceData.rebornLevel || Game.Game.TANK_REBORN_LEVEL;

        switch (this.boxInfoType) {
            case TankBox.TYPE_TANK : {
                var lvRate = App.getRunView().getUpLvRate();
                this._upLvRate = player.mostUpgrade(lvRate) || 1;
                var tapDamage = player.gameValues.tapDamage;

                cost = player.calcUpgradeCost(this._upLvRate);
                costStr = Narwhale.Config.formatNumber(cost);
                levelStr = "等级：" + playerLevel;
                desc = "点击攻击力：" + Narwhale.Config.formatNumber(tapDamage);

                var playerDamage = player.getDamage(playerLevel + this._upLvRate);
                var addDPSNum = playerDamage - tapDamage;
                valueStr = "+" + Narwhale.Config.formatNumber(addDPSNum);

                messageStr = "升级 x" + this._upLvRate;

                break;
            }

            case TankBox.TYPE_SKILL : {
                skill = playerSkills[this.skillName];

                if (skill) {
                    level = skill.level;
                    levelStr = "等级：" + level;
                    cost = skill.getCost();
                    costStr = Narwhale.Config.formatNumber(cost);
                    desc = skill.getEffectDesc();

                    if (skill.active()) {
                        messageStr = "升级";
                    }
                    else {
                        messageStr = "学习技能";
                    }

                    this.skillStartLevel = skill.getStartLevel();
                }

                break;
            }

            case TankBox.TYPE_REBORN : {
                levelStr = "进化之后获得珍贵的荣誉换取神器，";
                desc = "提升能力重新开始游戏";

                this.bgCopper.visible = false;

                if (playerLevel > this.rebornLevel) {
                    messageStr = "进化";
                }
                else {
                    messageStr = this.rebornLevel + "级可进化";
                }
                break;
            }
        }

        this.bgIcon.skin        = sourceData.skin || "assets/icons/tank/10001.png";
        this.textName.text      = sourceData.name || "";
        this.textLevel.text     = levelStr;
        this.textDesc.text      = desc;
        this.textValue.text     = valueStr;
        this.textCost.text      = costStr;
        this.textMessage.text   = messageStr;
        this.resetBtnState(cost);
    };

    TankBox.prototype.resetBtnState = function (cost) {
        var playerGold = App.player.gold;
        if(playerGold >= cost){
            this.btnUpgrade.disabled = false;
        }
        else{
            this.btnUpgrade.disabled = true;
        }
    };

    TankBox.prototype.setTankUpgradeState = function () {
        if(this.boxInfoType != TankBox.TYPE_TANK){
            return;
        }

        var cost = App.player.calcUpgradeCost(this._upLvRate);
        this.resetBtnState(cost);
    };

    TankBox.prototype.setUpgradeBtnState = function () {
        if (this.boxInfoType == TankBox.TYPE_SKILL) {
            var player = App.player;
            var playerGold = player.gold;
            var playerLevel = player.level;
            var skill = player.skills;
            var skillCost = skill[this.skillName].getCost();
            if(playerLevel >= this.skillStartLevel && playerGold >= skillCost){
                this.btnUpgrade.disabled = false;
            }
            else{
                this.btnUpgrade.disabled = true;
            }
        }
        else if (this.boxInfoType == TankBox.TYPE_REBORN) {
            var level = App.player.level;

            if (level >= this.rebornLevel) {
                this.btnUpgrade.disabled = false;
            }
            else {
                this.btnUpgrade.disabled = true;
            }
        }
    };

    TankBox.prototype.touchUpgrade = function () {
        var self = this;
        var player = App.player;

        var data = {};

        var route = "";

        if(this.boxInfoType == TankBox.TYPE_TANK){
            data.level = this._upLvRate;
            data.free = false;
            //*主角升级
            route = "player.upgrade";
            App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    player.syncPlayer(data);
                    self.updateInfoShow();
                    self.doUpgradeEffect();
                }
            }));
        }
        else if(this.boxInfoType == TankBox.TYPE_SKILL){
            //*技能升级
            data.name = this.skillName;
            route = "player.skillUpgrade";
            App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    player.syncPlayer(data);
                    self.updateInfoShow();
                    self.doUpgradeEffect();
                }
            }));
        }
        else if (this.boxInfoType == TankBox.TYPE_REBORN) {
            route = "player.evolve";
            App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    player.syncPlayer(data);
                    //*转生显示
                    if (self.battleView) {
                        self.battleView.event(TankBox.TANK_REBORN);
                    }
                }
            }));
        }
    };

    TankBox.prototype.updateInfoShow = function(){
        var player = App.player;
        var playerSkill = player.skills;
        if(this.boxInfoType == TankBox.TYPE_TANK){
            var level =  player.level;
            var damage = player.gameValues.tapDamage;

            var lvRate = App.getRunView().getUpLvRate();
            this._upLvRate = player.mostUpgrade(lvRate) || 1;

            this.textLevel.text =  "等级：" + level;
            this.textDesc.text  = "点击攻击力：" + Narwhale.Config.formatNumber(damage);

            var cost = player.calcUpgradeCost(this._upLvRate);
            var addDPSNum = player.getDamage(level + this._upLvRate) - damage;

            this.textMessage.text = "升级 x" + this._upLvRate ;
            this.textValue.text = "+"+Narwhale.Config.formatNumber(addDPSNum) || "";
            this.textCost.text = Narwhale.Config.formatNumber(cost);

            this.setTankUpgradeState();
        }
        else if(this.boxInfoType == TankBox.TYPE_SKILL){
            this.textMessage.text = "升级";
            this.textLevel.text = "等级：" + playerSkill[this.skillName].level;
            this.textCost.text = Narwhale.Config.formatNumber(playerSkill[this.skillName].getCost());
            this.textDesc.text = playerSkill[this.skillName].getEffectDesc();
            this.setUpgradeBtnState();
        }
    };

    TankBox.prototype.showBoxInfoPanel = function () {
        if (!this.boxInfoType) {
            return;
        }
        var panel = null;
        switch (this.boxInfoType) {
            case TankBox.TYPE_TANK: {

                break;
            }

            case TankBox.TYPE_SKILL: {
                panel = new TankSkillDialog(this.skillName);
                break;
            }
        }

        if (panel != null) {
            App.uiManager.addUiLayer(panel,{isAddShield:true,alpha:0,isDispose:true});
        }
    };

    TankBox.prototype.doUpgradeEffect = function(){
        var effect = SpineEffect.create(300041);
        if (effect != null) {
            effect.play();
            this.bgIcon.addChild(effect);
        }
        effect.x = 30;
        effect.y = 70;
    };

    TankBox.TYPE_TANK = "tank";
    TankBox.TYPE_SKILL = "skill";
    TankBox.TYPE_REBORN = "reborn";

    TankBox.TANK_REBORN = "tankReborn";

    return TankBox;
}(TankBoxUI));