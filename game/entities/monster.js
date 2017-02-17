(function(root) {
    var _super = root.Serialize;

    var Monster = root.Monster = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._stage              = opts._stage || null;

        this.id                  = opts.id || this._db.id || 0;
        this.name                = opts.name || this._db.name || "";
        this.type                = opts.type || Monster.TYPE_MOB;
        this.health              = opts.health || 1;
        this.maxHealth           = opts.maxHealth || this.health;
        this.gold                = opts.gold || 0;
        this.relics              = opts.relics || 0;
        this.diamond             = opts.diamond || 0;
        this.weapon              = opts.weapon || 0;

        this.deadHero            = opts.deadHero || 0;
        this.deadTime            = opts.deadTime || 0;
    };

    root.inherits(Monster, _super);

    root.extend(Monster.prototype, root.Interface);

    root.extend(Monster.prototype, {
        hurtHealth: function(x) {
            x = x || 0;

            if (this.health <= x) {
                this.health = 0;
                this.die();
            }
            else {
                this.health -= x;
            }

            this.event(Monster.HURT, x);
        },

        getKillHeroInfo: function() {
            if (this.deadTime <= 0) {
                return null;
            }
            return {deadTime: this.deadTime, deadHero: this.deadHero};
        },

        die: function() {
            this.event(Monster.DEAD, this);
        },

        drop: function() {

        },

        getType: function() {
            return this.type;
        },

        isBoss: function() {
            return this.type == Monster.TYPE_BOSS;
        }
    });

    Monster.TYPE_MOB = 0;
    Monster.TYPE_BOSS = 1;
    Monster.TYPE_CHEST = 2;

    Monster.DEAD = "mob.dead";
    Monster.DROP = "mob.drop";
    Monster.HURT = "mob.hurt";

    Monster.create = function(opts) {
        opts = opts || {};

        return new Monster(opts);
    };
}(hGame006));