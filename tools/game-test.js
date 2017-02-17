var _log = console.log;
var Game = require('../game');
var ProgressBar = require('progress');

var player = new Game.Player();

console.log(player);
var disableConsoleLog = function() {
    console.log = function() {
    };
};

var enableConsoleLog = function() {
    console.log = _log;
};
var progressBar = null;
var autoTap = function() {
    setTimeout(function() {
        var damage = player.gameValues.tapDamage;
        player.tap();

        progressBar.tick(damage, {});
        if (!progressBar.complete) {
            autoTap();
        } else {
            enableConsoleLog();
            console.log("   Complete");
            player.stage.clear();
            run();
        }
    }, 100);
};

var run = function() {
    var fmt = Game.sprintf("<Stage %d> Progress: %d/%d Tap: [:bar] :percent", player.stage.level, player.stage.progress, player.stage.mobCount);

    var monster = player.stage._monster;
    progressBar = new ProgressBar(fmt, { total: monster.health, width: 60, incomplete: ' ' });

    disableConsoleLog();
    autoTap();
};

run();


