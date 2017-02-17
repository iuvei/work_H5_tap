
var ActorTank = (function(_super) {
    function ActorTank(id) {
        // 初始化动作序列
        this.idle = "idle";
        _super.call(this, id);

        //*普通攻击动作
        this.attacks = [ "attack1", "attack2", "attack3", "attack4" ];
        this.effects = [ 1001, 1002, 1003, 1004 ];

        //*在播放的特效
        this._runningEffect = {};
        //*是否使用跳劈技能
        this._usedHeavenlystrike = false;
        //*播放转生动作
        //this._isPla
    }

    Laya.class(ActorTank, "ActorTank", _super);

    ActorTank.prototype.playAttack = function() {
        this.state = Actor.STATE_ATTACK;
        var actName = this.getAttackAction();
        var effect = SpineEffect.create(this.effects[this.attackIndex]);

        this.addChild(effect);

        this.play(actName, false);
        effect.play();
    };

    //*动作事件
    ActorTank.prototype.animationEvent = function(e) {
        //*表演跳劈动作结束的时候
        if (this._usedHeavenlystrike) {
            this.event(ActorTank.USED_SKILL_HEAVENLYSTRIKE);
            this._usedHeavenlystrike = false;
        }
    };

    //*使用技能的动作和特效表现
    ActorTank.prototype.doSkillAction = function(useSkill){
        var skillList = Game.Game.SKILL_NAMELIST;
        if (skillList.indexOf == -1) {
            return;
        }
        //*因为有时候要有两个特效同时出现
        var effect = null;
        var effect_1 = null;

        switch (useSkill){
            case skillList[0]:{
                //*喷血特效
                effect = SpineEffect.create(1008);
                //*技能动作
                this.play(ActorTank.ACTION_SKILL_HEAVENLYSTRIKE);
                this._usedHeavenlystrike = true;

                if(effect != null){
                    this.addChild(effect);
                    effect.play();
                }
                break;
            }

            case  skillList[1]:{
                //*影分身
                //effect = SpineEffect.create(1005);
                //if(effect != null){
                //    this.addChild(effect);
                //    effect.play();
                //}

                effect = SpineEffect.create(1006);
                if(effect != null){
                    this.addChild(effect);
                    effect.play();
                }

                this._runningEffect[useSkill] = {effect: effect};
                break;
            }

            case  skillList[2]:{
                //*嗜血
                effect = SpineEffect.create(1009);
                if(effect != null){
                    this.addChild(effect);
                    effect.play();
                }

                effect_1 = SpineEffect.create(1010);
                if(effect_1 != null){
                    this.addChild(effect_1);
                    effect_1.play();
                }

                this._runningEffect[useSkill] = {effect: effect, effect_1: effect_1};
                break;
            }

            case  skillList[3]:{
                break;
            }

            case  skillList[4]:{
                effect = SpineEffect.create(1011);
                if(effect != null){
                    this.addChild(effect);
                    effect.play();
                }

                effect_1 = SpineEffect.create(1012);
                if(effect_1 != null){
                    this.addChild(effect_1);
                    effect_1.play();
                }

                this._runningEffect[useSkill] = {effect: effect, effect_1: effect_1};
                break;
            }

            case skillList[5]:{
                effect = SpineEffect.create(1013);
                if(effect != null){
                    this.addChild(effect);
                    effect.play();
                }

                effect_1 = SpineEffect.create(1014);
                if(effect_1 != null){
                    this.addChild(effect_1);
                    effect_1.play();
                }

                this._runningEffect[useSkill] = {effect: effect, effect_1: effect_1};
                break;
            }

            default : {
                break;
            }
        }

        this.state = Actor.STATE_IDLE;
    };

    //*删除特效
    ActorTank.prototype.removeSkillEffect = function (skillName) {
        if (!skillName) {
            return;
        }

        if (this._runningEffect[skillName]) {
            var effectList = this._runningEffect[skillName];
            for (var index in effectList) {
                var effect = effectList[index];
                effect.exit();
            }
        }
    };

    //*转生的动作以及特效表现
    ActorTank.prototype.doRebornAction = function () {
        this.play(ActorTank.ACTION_REBORN);
    };

    ActorTank.USED_SKILL_HEAVENLYSTRIKE = "usedSkillHeavenlyStrike";
    //*技能跳劈
    ActorTank.ACTION_SKILL_HEAVENLYSTRIKE = "skill";
    //*秒杀动作
    ActorTank.ACTION_WINKKILL = "skill2";
    //*转生动作
    ActorTank.ACTION_REBORN = "reborn";

    return ActorTank;
    
}(Actor));