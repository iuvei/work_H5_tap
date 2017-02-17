var fs = require('fs');
var path = require('path');

var files = [];
var excludeFiles = [
    "../game/index.js",
    "../game/node_modules/",
    "../game/dist"
];

var prioritys = [];
prioritys.push({path:"libs/", p:0});
prioritys.push({path:"base/boot.js",p:1});
prioritys.push({path:"base/events.js", p:2});
prioritys.push({path:"base/serialize.js", p:3});
prioritys.push({path:"base/entity.js", p:4});
prioritys.push({path:"consts/", p:5});
prioritys.push({path:"entities/interface.js", p:6});

prioritys.push({path:"entities/stage.js", p:999});
prioritys.push({path:"entities/player.js", p:1000});

var fileHandler = function(name){
    var file = name;

    file = file.replace(/\\/g,"/");
    if (!/\.js$/.test(file)) {
        return;
    }

    for (var i in excludeFiles) {
        if (file.indexOf(excludeFiles[i]) != -1) {
            return;
        }
    }

    files.push(file.substr(8));
};

var readDirectory = function(dir, handler) {
    fs.readdirSync(dir).forEach(function(file) {
        var name = dir + path.sep + file;
        var stat = fs.lstatSync(name);

        if (stat.isDirectory() == true) {
            readDirectory(name, handler);
        }
        else {
            handler(name);
        }
    });
};

var sortFunc = function(a,b) {
    var aPriority = 100;
    var bPriority = 100;
    for(var i in prioritys){
        if(a.indexOf(prioritys[i].path) == 0){
            aPriority = prioritys[i].p;
            break;
        }
    }
    for(var i in prioritys){
        if(b.indexOf(prioritys[i].path) == 0){
            bPriority = prioritys[i].p;
            break;
        }
    }

    if(aPriority < bPriority){
        return -1;
    }else if(aPriority > bPriority){
        return 1;
    }else{
        if (a < b) {
            return -1;
        }
        else {
            return 1;
        }
    }
};

readDirectory("../game", fileHandler);

files.sort(sortFunc);

fs.writeFile("../game/files.json", JSON.stringify(files, null, 4), function(err) {
    if (err)
        console.log("fail " + err);
    else
        console.log("files.json input done");
});