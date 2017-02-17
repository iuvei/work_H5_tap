
var ActorMonster = (function(_super) {
    function ActorMonster(id) {
        // 初始化动作序列
        this.idle = "idle";
        this.under_attack = "uattack";
        this.underAttackCommand = 0;
        _super.call(this, id);
    }

    Laya.class(ActorMonster, "ActorMonster", _super);

    ActorMonster.prototype.playUnderAttack = function() {
        this.animation.play(this.under_attack, false);
    };

    ActorMonster.prototype.underAttack = function() {
        if (this.state == Actor.STATE_IDLE) {
            this.playUnderAttack();
            this.state = Actor.STATE_UNDER_ATTACK;
        }
        else {
            this.underAttackCommand++;
            var speed = 2 + Math.floor(this.underAttackCommand - 1) * 3;
            this.animation.playbackRate(speed);
        }
    };

    ActorMonster.prototype.animationEnd = function() {
        if (this.underAttackCommand) {
            this.playUnderAttack();
            this.underAttackCommand--;
        }
        else {
            this.state = Actor.STATE_IDLE;
            this.playIdle();
            this.animation.playbackRate(1);
        }
    };

    return ActorMonster;

}(Actor));