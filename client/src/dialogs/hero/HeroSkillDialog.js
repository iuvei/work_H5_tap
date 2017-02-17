/**
 * Created by WhelaJoy on 2017/1/11.
 */
var HeroSkillDialog = (function(_super){
    function HeroSkillDialog(info){
        HeroSkillDialog.super(this);
        this._heroInfo = info;
        this.initView();
    }
    Laya.class(HeroSkillDialog,"HeroSkillDialog",_super);
    HeroSkillDialog.prototype.initView = function(){
        var data = this._heroInfo;
        this.heroIcon.skin = "assets/icons/heros/" + data.id + ".jpg";
        this.nameLab.text = data.getName();
        this.levelLab.text = data.level;
        this.dpsLab.text = Narwhale.Config.formatNumber(data.getDPS());
        this.descLab.text = Narwhale.Config.actors[data.id].desc;

        //this.nowStarLab.text = data.getDPS();
        //this.nextStarLab.text = data.getDPS();
        //var skillBought = data.skillBought;
        this._skillBoxs = [];
        var self = this;
        for(var i = 0 ; i < 8 ; i++){
            var skillBoxs = self["skillBox"+i];
            this._skillBoxs.push(skillBoxs);
        }
        //this._skillBoxNext = self["skillBox7"];

        this.updateSkillList();
    };

    HeroSkillDialog.prototype.updateSkillList = function() {
        var data = this._heroInfo;
        var level = data.level;
        var skillBought = data.skillBought;
        var skillConfig = Narwhale.Config.Skill;
        var skillList = Narwhale.Config.actors[data.id].skillList;
        var SkillAtLevel = Game.Game.SKILL_AT_LEVEL;
        var SkillTraslaction = Game.Game.SKILL_TRASLACTION;
        var db = data.getDB();
        var SkillTypes = db.skillType;
        var skillValues = db.skillValue;

        for(var k in skillBought){
            var skillBox = this._skillBoxs[k];
            var skillInfo = skillBought[k];
            var icon = skillBox.getChildByName("icon");
            var nameLab = skillBox.getChildByName("nameLab");

            var levelLab = skillBox.getChildByName("levelLab");
            var Lv = skillBox.getChildByName("Lv");

            var descLab = skillBox.getChildByName("descLab");

            var SkillType =  SkillTypes[k];
            var SkillValue =  skillValues[k];

            nameLab.text = skillConfig[skillList[k]].name;
            icon.skin = "assets/icons/skills/square/" + skillList[k] + ".jpg";
            descLab.text = SkillTraslaction[SkillType] + (SkillValue * 100) + "%";

            if(skillInfo){
                levelLab.visible = false;
                Lv.visible = false;
            }
            else{
                icon.gray = true;
                icon.alpha = 0.3;
                var newSkillLv = SkillAtLevel[k];
                if(level > 1000){
                    newSkillLv += 1000;
                }
                levelLab.text = newSkillLv;
            }
        }

        if(level <= 1000) {
            var skillBox = this._skillBoxs[7];
            var icon = skillBox.getChildByName("icon");
            var nameLab = skillBox.getChildByName("nameLab");
            var levelLab = skillBox.getChildByName("levelLab");
            var descLab = skillBox.getChildByName("descLab");

            descLab.text = "重置这个英雄并大幅增加攻击力";
            nameLab.text = "进化";
            levelLab.text = "1000";
            icon.skin = "assets/icons/skills/square/rebornHero.jpg";
            icon.alpha = 0.3;
            icon.gray = true;
        }
        else{
            this._skillBoxs[7].visible = false;

        }
    };

    HeroSkillDialog.prototype.close = function() {
        _super.prototype.close.call(this);
        App.uiManager.removeUiLayer(this);
    };

    return HeroSkillDialog
})(HeroSkillDialogUI);
