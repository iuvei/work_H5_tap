(function(root) {
    var _super = root.Serialize;

    var Game = root.Game;
    var Achievement = root.Achievement = function(opts) {
        opts = opts || {};
        
        _super.call(this, opts);
    };

    root.inherits(Achievement, _super);

    root.extend(Achievement.prototype, root.Interface);

    root.extend(Achievement.prototype, {
        
    });

    Achievement.create = function(opts, player) {
        opts = opts || {};

        return {};
    };

    Achievement.load = function(opts, player) {
        opts = opts || {};

        return {};
    };
}(hGame006));