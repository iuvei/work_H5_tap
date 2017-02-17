var SkillTab = (function(_super){
    function SkillTab (matrix){
        SceneTab.super(this);

        this.skillTabs = matrix;
        this.spriteList = {};
        this.skillBtn = {};
        this.coolDownLableList = {};
    }

    Laya.class(SkillTab, "SkillTab", _super);

    SkillTab.prototype.initSkillTab = function () {
        this.init();
        this.initEvent();
        this.initSkillStateShow();
    };

    SkillTab.prototype.init = function () {
        for (var i = SkillTab.SKILL_START; i < SkillTab.SKILL_TOTAL; i++) {
            var tab = this.skillTabs[i];
            var skillName = tab[SkillTab.SKILL_NAMEINDEX];
            tab[SkillTab.SKILL_INACTIVE].on(Laya.Event.CLICK, this, this.touchSkill,[skillName]);
            //*按钮的sprite用来控制隐藏和显示的
            this.spriteList[skillName] = tab[SkillTab.SKILL_SPRITE];
            //*技能图标（按钮）
            this.skillBtn[skillName] = tab[SkillTab.SKILL_INACTIVE];
            //*冷却时间显示的lable
            this.coolDownLableList[skillName] = tab[SkillTab.SKILL_TIMEBARINDEX];
            this.coolDownLableList[skillName].text = "";
        }
    };
    
    SkillTab.prototype.initEvent = function () {
        var player = App.player;
        var playerSkills = player.skills;

        for (var skillIndex in playerSkills) {
            var skill = playerSkills[skillIndex];
            skill.on(Game.Skill.CAST, this, this.useSkill);
            skill.on(Game.Skill.LEVELCHANGE, this, this.skillVisible);
            skill.on(Game.Skill.RESET, this, this.resetSkillState);
        }
    };

    SkillTab.prototype.touchSkill = function (skillName) {
        var self = this;
        var player = App.player;
        var playerSkill = player.skills[skillName];
        if(playerSkill.getAvailable() > 0){
            App.uiManager.showDialogByErrCode({number:Game.Code.GAME_ERR.SKILL_IS_ON_CD});
            return;
        }

        var data = {
            name: skillName
        };
        var route = "player.skillCast";
        App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if(err){
                App.uiManager.showDialogByErrCode(err);
            }
            else{
                player.syncPlayer(data);
            }
        }));
    };
    
    SkillTab.prototype.useSkill = function (skillObj) {
        if (!skillObj) {
            return;
        }

        var skillIndexName = this.getSkillIndexName(skillObj);
        var skill = this.getPlayerSkill(skillIndexName);

        if (skill) {
            this.skillDuration(skillIndexName);
        }
    };

    //*技能的持续释放时间
    SkillTab.prototype.skillDuration = function (skillName) {
        if (!skillName) {
            return;
        }

        //*动作表现
        this.event(SkillTab.USESKILL,skillName);

        //*第一个技能直接到CD
        if (skillName == Game.Game.SKILL_NAMELIST[0]) {
            this.enterSkillCoolDown(skillName);
            this.event(SkillTab.DELETE_EFFECT, skillName);
            return;
        }

        var skill = this.getPlayerSkill(skillName);
        var skillBtn = this.skillBtn[skillName];
        var coolDownLabel = this.coolDownLableList[skillName];
        var durationTime = skill.getDurationTime();
        if(durationTime > 0 && skill.isRunning()){
            //*倒计时显示
            var durationCoolDownFunc = function(){
                var nowTime = App.getAsyncSecond();
                var diff = durationTime - nowTime;
                coolDownLabel.text = Narwhale.Config.formatSecondToHHMMSS(diff);
                coolDownLabel.color = SkillTab.SKILL_DURATIONCOLOR;
                if(diff <= 0){
                    coolDownLabel.text = "";
                    //*通知技能特效表演结束
                    this.event(SkillTab.DELETE_EFFECT, skillName);
                    //*进入技能冷却
                    this.enterSkillCoolDown(skillName);

                    Laya.timer.clear(this, durationCoolDownFunc);
                }
            };

            Laya.timer.loop(1000, this, durationCoolDownFunc);
        }
        else{
            this.enterSkillCoolDown(skillName);
        }

        skillBtn.disabled = true;
    };

    //*进入CD
    SkillTab.prototype.enterSkillCoolDown = function (skillName) {
        if(!skillName){
            return;
        }

        var skill = this.getPlayerSkill(skillName);
        var skillBtn = this.skillBtn[skillName];
        var coolDownLabel = this.coolDownLableList[skillName];
        //*获取冷却时间
        var coolDown = skill.getAvailable();
        if(coolDown > 0){
            skillBtn.disabled = true;
            //*倒计时回调
            var updateFunction = function(){
                coolDown -= 1;
                coolDownLabel.text = Narwhale.Config.formatSecondToHHMMSS(coolDown);
                coolDownLabel.color = SkillTab.SKILL_CDLABELCOLOR;
                if(coolDown <= 0){
                    skillBtn.disabled = false;
                    coolDownLabel.text = "";
                    Laya.timer.clear(this, updateFunction);
                }
            };
            //*进入时间倒计时显示
            Laya.timer.loop(1000, this, updateFunction);
        }
    };

    //*初始化技能显示
    SkillTab.prototype.initSkillStateShow = function () {
        for (var index in Game.Game.SKILL_NAMELIST) {
            var name = Game.Game.SKILL_NAMELIST[index];
            var singleSkill = this.getPlayerSkill(name);
            if (!singleSkill) {
                continue;
            }
            var isActive = singleSkill.active();
            var isRunning = singleSkill.isRunning();
            if(isActive){
                //*已经学习的技能要检查技能的cd情况还有持续状态
                if(isRunning){
                    this.skillDuration(name);
                }
                else{
                    this.enterSkillCoolDown(name);
                }
            }
            else{
                //*没有学习的技能快捷图标隐藏
                this.spriteList[name].visible = false;
            }
        }
    };
    
    SkillTab.prototype.resetSkillState = function (skillObj) {
        if (!skillObj) {
            return;
        }

        var skillIndexName = this.getSkillIndexName(skillObj);
        var skill = this.getPlayerSkill(skillIndexName);
        if(skill){
            this.spriteList[skillIndexName].visible = false;
        }
    };

    SkillTab.prototype.skillVisible = function (skillObj) {
        if(!skillObj){
            return;
        }

        var skillIndexName = this.getSkillIndexName(skillObj);
        var skill = this.getPlayerSkill(skillIndexName);
        if(skill){
            var isActive = skill.active();
            if(isActive){
                this.spriteList[skillIndexName].visible = true;
            }
            else{
                this.spriteList[skillIndexName].visible = false;
            }
        }
    };

    SkillTab.prototype.getSkillIndexName = function (skillObj) {
        if (!skillObj) {
            return;
        }

        var skillIndexName = null;
        var skillName = skillObj.getName();
        var skillList = Game.Game.SKILL_LIST;

        for (var index in skillList) {
            var skillDB = skillList[index];
            var dbName = skillDB.name;
            if (skillName == dbName) {
                skillIndexName = index;
                break;
            }
        }

        return skillIndexName;
    };

    SkillTab.prototype.getPlayerSkill = function (skillIndexName) {
        var playerSkills = App.player.skills;
        var skill = playerSkills[skillIndexName];
        if (skill) {
            return skill;
        }
        else {
            return false;
        }
    };

    SkillTab.SKILL_TOTAL = 6;
    SkillTab.SKILL_START = 0;
    SkillTab.SKILL_SPRITE = 0;
    SkillTab.SKILL_INACTIVE = 1;
    SkillTab.SKILL_NAMEINDEX = 2;
    SkillTab.SKILL_TIMEBARINDEX = 3;

    SkillTab.USESKILL = "useSkill";
    SkillTab.DELETE_EFFECT = "deleteEffect";
    SkillTab.SKILL_VISIBLE = "skillVisibel";

    SkillTab.SKILL_CDLABELCOLOR = "#00FFFF";
    SkillTab.SKILL_DURATIONCOLOR = "#FFFF00";

    return SkillTab;
}(laya.events.EventDispatcher));