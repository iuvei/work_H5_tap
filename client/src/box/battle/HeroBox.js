/**
 * Created by WhelaJoy on 2017/1/13.
 */
var HeroBox = (function(_super) {
    function HeroBox() {
        HeroBox.super(this);
        this.init();
        this.initEvent();
    }

    Laya.class(HeroBox, "HeroBox", _super);
    var _proto = HeroBox.prototype;
    HeroBox.prototype.init = function(){
        this._LvIcon = this.skillBox.getChildByName("item7");
        this._LvIcon.visible = false;
        this._skillIconList = [];
        for (var i = 0 ; i < 7 ; i++){
            var skillIcon = this.skillBox.getChildByName("item" + i);
            skillIcon.visible = false;
            this._skillIconList.push(skillIcon);
        }
    };

    HeroBox.prototype.initEvent = function(){
        this.btnUpgrade.on(Laya.Event.CLICK,this,this.touchUpgrade);
        this.btnUpSkill.on(Laya.Event.CLICK,this,this.touchUpSkill);
        this.getChildByName("backgroud").on(Laya.Event.CLICK,this,this.touchHeroView);


        var player = App.player;
        player.on(Game.Player.UPDATEGOLD, this, this.updateGold.bind(this),[this]);

        Laya.timer.loop(1000, this, this.updateDeadCDTiem);
    };

    HeroBox.prototype.updateDeadCDTiem = function(){
        var data = this._data;
        if(!data){
            return;
        }
        if(data.level > 0 && !data.active()){
            var nowTime = App.getAsyncSecond();
            var diff = data.deadCD - nowTime;
            this.timeLab.text = Narwhale.Config.formatSecondToHHMMSS(diff);
            if(diff <= 0){
                this.onRender(this);
            }
        }
    };

    HeroBox.prototype.touchHeroView = function(){
        if(!this._data){
            return;
        }
        var heroSkillDialog = new HeroSkillDialog(this._data);
        App.uiManager.addUiLayer(heroSkillDialog,{isAddShield:true,alpha:0,isDispose:true});
    };

    HeroBox.prototype.updateGold = function(){
        var data = this._data;
        if(!data){
            return
        }
        var level = data.level;
        var cost = data.getCost(level + 1);
        this.updateUpgradeBtnShow(cost);
    };

    HeroBox.prototype.onRender = function(cell,index) {
        var data = cell.dataSource;
        if(!data){
            return;
        }
        this._data = data;
        this._index = index;

        var level = data.level;
        this.bgIcon.skin = "assets/icons/heros/" + data.id + ".jpg";
        this.nameLab.text = data.getName();
        if(level > 0){
            var updarate = App.getRunView().getUpLvRate();
            this._upLvRate = data.mostUpgrade(updarate) || 1;
            this._deadCD = data.deadCD;
            //console.log("herp deadCD = "+ this._deadCD);

            var DPS = data.getDPS();
            this.bgIcon.gray = false;

            this.Lv.text = "Lv.";
            this.dps.text = "DPS：";
            this.levelLab.text = level;
            this.dpsLab.text = Narwhale.Config.formatNumber(DPS);

            if(!data.active()){
                var cost = data.getReviveCost();

                this.skillBox.visible = false;
                this.btnUpSkill.visible = false;
                this.timeBox.visible = true;
                this.dieBg.visible = true;

                this.textMessage.text   = "" ;
                this.textValue.text  =  "";
                this.textCost.text = cost;
                this.text.text = "复活";
                this.costIcon.skin = "assets/ui.common/money_diamond_3.png";

                this._isRevive = true;
                this.updateUpgradeBtnShow(cost);
            }
            else{
                var cost = data.calcUpgradeCost(this._upLvRate);
                var addDPSNum = data.calcDPS(level + this._upLvRate) - DPS;

                this.textMessage.text   = "升级 x" + this._upLvRate;
                this.textValue.text  =  "+"+Narwhale.Config.formatNumber(addDPSNum) || "";
                this.textCost.text = Narwhale.Config.formatNumber(cost) || "";
                this.costIcon.skin = "assets/ui.common/money_copper_2.png";
                this.text.text = "";

                this.updateUpgradeBtnShow(cost);
                this.updateSkillShow();

                this.skillBox.visible = true;
                this._LvIcon.visible = false;

                this.timeBox.visible = false;
                this.dieBg.visible = false;

                this._isRevive = false;
            }

        }else{
            this._upLvRate = 1;
            this._deadCD = data.deadCD;

            var cost = data.calcUpgradeCost(level + this._upLvRate);
            this.textCost.text = Narwhale.Config.formatNumber(cost) || "";

            this.Lv.text = "";
            this.dps.text = "";

            this.levelLab.text = "";
            this.dpsLab.text = "";
            this.textMessage.text = "";
            this.costIcon.skin = "assets/ui.common/money_copper_2.png";
            this.text.text = "邀请";

            this.bgIcon.gray = true;

            this.textValue.text  = "";
            this.updateUpgradeBtnShow(cost);

            this.skillBox.visible = false;
            this.btnUpSkill.visible = false;
            this.timeBox.visible = false;
            this.dieBg.visible = false;

            this._isRevive = false;
        }

    };

    HeroBox.prototype.touchUpSkill = function(){
        var self = this;
        var player = App.player;

        var data = {};
        var level = this._data.level;
        if(!this._fristSkill && level == 1000){
            //开始进化
            data.id = this._index;

            var route = "hero.evolve";

            App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    this.btnUpSkill.visible = false;
                    player.syncPlayer(data);

                    var heros = player.heros;
                    if(this._fristSkillLab){
                        this._fristSkillLab.visible = false;
                    }
                    this._LvIcon.visible = false;

                    this.updateInfoShow(heros[self._index]);
                    this.updateSkillShow();
                    this.doUpgradeEffect();

                }
            }));
        }
        else{
            //开始技能
            data.skillId = this._skillIndex;
            data.id = this._index;

            var route = "hero.skillUpgrade";

            App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    this.btnUpSkill.visible = false;
                    player.syncPlayer(data);

                    var heros = player.heros;
                    if(this._fristSkillLab){
                        this._fristSkillLab.visible = false;
                    }
                    this._LvIcon.visible = false;
                    this.updateInfoShow(heros[self._index]);
                    this.updateSkillShow();
                    this.doUpgradeEffect();
                }
            }));
        }


    };

    HeroBox.prototype.touchUpgrade = function () {

        if(!this._isRevive){
            var player = App.player;
            var data = {};

            data.level = this._upLvRate;
            data.id = this._index;

            var route = "hero.upgrade";
            App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    //console.log("data : " + JSON.stringify(data));
                    player.syncPlayer(data);

                    this._index = data.hero[0].id;

                    var heros = player.heros;
                    this.updateInfoShow(heros[this._index]);
                    this.updateSkillShow();
                    this.doUpgradeEffect();
                }
            }));
        }
        else{
            //复活

            var player = App.player;
            var data = {};

            data.id = this._index;

            var route = "hero.revived";
            App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
                if(err){
                    App.uiManager.showDialogByErrCode(err);
                }
                else{
                    player.syncPlayer(data);

                    this.onRender(this);
                    //this.doUpgradeEffect();
                }
            }));
        }
    };

    HeroBox.prototype.updateInfoShow = function(data){
        this._upLvRate = data.mostUpgrade(App.getRunView().getUpLvRate()) || 1;

        var level = data.level;
        var cost = data.calcUpgradeCost(this._upLvRate);
        var DPS = data.getDPS();


        this.textCost.text = Narwhale.Config.formatNumber(cost) || "";

        this.levelLab.text = level;
        this.dpsLab.text = Narwhale.Config.formatNumber(DPS);
        this.textMessage.text   = "升级 x" +  this._upLvRate ;
        this.bgIcon.gray = false;

        var addDPSNum = data.calcDPS(level + this._upLvRate) - DPS;
        this.textValue.text  =  "+"+Narwhale.Config.formatNumber(addDPSNum) || "";
        if(level == 1){
            //创建英雄
            App.uiManager.event(Narwhale.Event.Battle.CREATEHERO,data);
            App.uiManager.event(Narwhale.Event.Battle.CREATEHEROITEM,(this._index+1));
        }

        this.updateUpgradeBtnShow(cost);
    };

    HeroBox.prototype.updateUpSkillShow = function(index){
        if(!this._data){
            return
        }
        var index = index || 0;
        var data = this._data;
        var level = data.level;

        if(index < 8){

            this._skillIndex = index;
            var SkillAtLevel = Game.Game.SKILL_AT_LEVEL;

            var newSkillLv = SkillAtLevel[index];
            if(level > 1000){
                newSkillLv += 1000;
            }
            this._fristSkillLab.text = "Lv\n" + newSkillLv;
            if(level >= newSkillLv){

                //this.btnUpSkill.visible = true;
                var skillConfig = Narwhale.Config.Skill;
                var skillList = Narwhale.Config.actors[data.id].skillList;

                var cost = this._data.getSkillCost(index);

                this.skillcost.text = Narwhale.Config.formatNumber(cost);
                this.skillname.text = "开启";
                this.skilltext.text = "";
                this.skillvalue.text = skillConfig[skillList[index]].name;
                this.updateUpSkillBtnShow(cost);
            }
            else{
                this.btnUpSkill.visible = false;
            }
        }
        else{
            if(this._fristSkillLab){
                this._fristSkillLab.text = "Lv\n" + "1000";
            }

            if(level == 1000){
                var cost = data.getCost(level + 1);
                this.skillcost.text = Narwhale.Config.formatNumber(cost);
                this.btnUpSkill.visible = true;
                this.skillname.text = "";
                this.skilltext.text = "进化";
                this.skillvalue.text = "";
                var player = App.player;
                var playerGold = player.gold;
                if( playerGold >= cost){
                    this.btnUpSkill.disabled = false;
                }
                else{
                    this.btnUpSkill.disabled = true;
                }
            }
            else{
                this.btnUpSkill.visible = false;
            }
        }
    };

    HeroBox.prototype.updateSkillShow = function(){
        var data = this._data;
        var level  = data.level;
        var skillBought = data.skillBought;
        var skillList = Narwhale.Config.actors[data.id].skillList;
        this._fristSkill = false;
        for(var k in skillBought){
            var skillInfo = skillBought[k];
            var icon = this._skillIconList[k];
            if(skillInfo){
                icon.visible = true;
                icon.gray = false;
                icon.alpha = 1;
                icon.skin = "assets/icons/skills/square/" + skillList[k] + ".jpg";
            }
            else{
                if(! this._fristSkill){
                    icon.visible = true;
                    icon.gray = true;
                    this._fristSkill = true;
                    icon.skin = "assets/icons/skills/square/" + skillList[k] + ".jpg";
                    icon.alpha = 0.3;
                    if(this._fristSkillLab){
                        this._fristSkillLab.removeSelf();
                        this._fristSkillLab = null;
                    }

                    this._fristSkillLab = new Laya.Text();
                    this._fristSkillLab.color = "#FFFFFF";
                    this._fristSkillLab.width = icon.width + 20;
                    this._fristSkillLab.height = icon.height ;
                    this._fristSkillLab.align = "center";
                    this._fristSkillLab.valign = "middle";
                    this._fristSkillLab.wordWrap  = true;
                    this._fristSkillLab.fontSize = 15;
                    this._fristSkillLab.x = icon.x - 10;
                    this._fristSkillLab.y = icon.y;
                    this.skillBox.addChild(this._fristSkillLab);

                    this.updateUpSkillShow(parseInt(k));
                    continue;
                }
                icon.visible = false;
            }
        }

        if(!this._fristSkill && level <= 1000){
            var icon = this._LvIcon;
            icon.visible = true;
            icon.gray = true;
            icon.skin = "assets/icons/skills/square/rebornHero.jpg";
            icon.alpha = 0.3;
            if(this._fristSkillLab){
                this._fristSkillLab.removeSelf();
                this._fristSkillLab = null;
            }

            this._fristSkillLab = new Laya.Text();
            this._fristSkillLab.color = "#FFFFFF";
            this._fristSkillLab.width = icon.width + 20;
            this._fristSkillLab.height = icon.height ;
            this._fristSkillLab.align = "center";
            this._fristSkillLab.valign = "middle";
            this._fristSkillLab.wordWrap  = true;
            this._fristSkillLab.fontSize = 15;
            this._fristSkillLab.x = icon.x - 10;
            this._fristSkillLab.y = icon.y;
            this.skillBox.addChild(this._fristSkillLab);

            this.updateUpSkillShow(8);
        }
        else if(!this._fristSkill){
            this.updateUpSkillShow(8);
        }
    };

    HeroBox.prototype.updateUpgradeBtnShow = function(cost){
        var player = App.player;
        var playerGold = player.gold;
        if( playerGold >= cost){
            this.btnUpgrade.disabled = false;
        }
        else{
            this.btnUpgrade.disabled = true;
        }
    };

    HeroBox.prototype.updateUpSkillBtnShow = function(cost){
        var player = App.player;
        var playerGold = player.gold;
        if( playerGold >= cost){
            this.btnUpSkill.visible = true;
        }
        else{
            this.btnUpSkill.visible = false;
        }
    };

    HeroBox.prototype.doUpgradeEffect = function(){
        var effect = SpineEffect.create(300041);
        if (effect != null) {
            effect.play();
            this.bgIcon.addChild(effect);
        }
        effect.x = 30;
        effect.y = 70;
    };

    HeroBox.renderHandler = function(cell, index) {
        cell.onRender(cell,index);

    };

    return HeroBox;
}(HeroBoxUI));