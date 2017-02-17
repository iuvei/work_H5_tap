var TankSkillDialog = (function(_super){
    function TankSkillDialog(skillName){
        TankSkillDialog.super(this);

        this.skillName = skillName;

        this.initView();
    }

    Laya.class(TankSkillDialog,"TankSkillDialog",_super);

    TankSkillDialog.prototype.initView = function () {
        if (!this.skillName) {
            return;
        }

        var playerSkills = App.player.skills;
        var skill = playerSkills[this.skillName];
        var level = skill.level || 0;
        var name = skill.getName() || "";
        var effect = skill.getEffectDesc() || "";
        var duration = skill.getDuration() || 0;
        var coolDown = skill.getCoolDown() || 0;
        var skin = null;
        var id = skill.id;

        if (id) {
            skin = "assets/icons/skills/square/" + skill.id + ".jpg";
            this.icon.skin = skin;
        }

        this.nameLabel.text = name;
        this.levelLabel.text = "等级:" + level;
        this.effectLabel.text = effect;
        this.coolDownLabel.text = "持续时间: " + duration + "秒  | 冷却: " + coolDown + "秒";
    };

    TankSkillDialog.prototype.close = function () {
        _super.prototype.close.call(this);
        App.uiManager.removeUiLayer(this);
    };

    return TankSkillDialog;
})(TankSkillDialogUI);
