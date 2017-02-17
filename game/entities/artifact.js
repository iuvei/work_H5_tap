(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Artifact = root.Artifact = function(opts) {
        opts = opts || {};
        
        _super.call(this, opts);
    
        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._name               = this._db.name;
    
        this.id                  = opts.id || this._db.id;
        this.level               = opts.level || 0;
        this.key                 = opts.key;
        this.consume             = opts.consume || 0;
    };

    root.inherits(Artifact, _super);

    root.extend(Artifact.prototype, root.Interface);

    root.extend(Artifact.prototype, {
        getName: function() {
            return this._name;
        },

        getDB: function() {
            return this._db;
        },

        getCost: function() {
            return Math.round(this._db.costX * Math.pow(this.level+1, this._db.costY));
        },
        
        getEffect: function() {
            return {effect: this._db.effect, value: this._db.efFunc(this.level)};
        },
        
        getDamage: function(level) {
            level = level || this.level;

            var artifactValues = this.getArtifactValues();
            return (this._db.baseDamage + this._db.incrementDamage * level) * (1 + artifactValues.DPS);
        },

        getEffectDesc: function(level) {
            level = level || this.level;

            return this._db.efDesc(level);
        },

        getLevel: function() {
            return this.level;
        },

        getMaxLevel: function() {
            return this._db.maxLevel;
        },

        getConsume: function() {
            return this.consume;
        },

        getSaleCost: function() {
            return Math.ceil(this.consume / 2) + 49;
        },

        isNotForSale: function() {
            return this._db.not_for_sale || false;
        },
        
        getDescribe: function() {
            return this._db.description;
        },

        upgrade: function(cost) {
            if (this._db.maxLevel != -1 && this.level >= this._db.maxLevel) {
                return;
            }

            cost = cost || 0;

            this.level++;
            this.consume += cost;
        },

        destroy: function() {

        },

        syncArtifact: function(opts) {
            var self = this;
            var i;
            var value;
            opts = opts || {};

            if (opts.upgrade != null) {
                value = parseInt(opts.upgrade);
                self.upgrade(value);
            }
        }
    });

    Artifact.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.ARTIFACT_LIST[data.key];

        return new Artifact(data);
    };

    Artifact.load = function(opts, player) {
        opts = opts || {};

        var artifacts = {};
        for (var key in opts) {
            var data = opts[key];

            if (opts[key] != null) {
                artifacts[key] = Artifact.create(data, player);
            }
        }

        return artifacts;
    };
}(hGame006));