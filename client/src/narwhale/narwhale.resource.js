
(function(root) {
    var resource = root.resource = root.resource || {};

    resource.actors = (function () {
        var actorResources = {};
        var idArray = [];

        // 主角
        idArray.push(101);

        // 天使
        idArray.push(9999);

        // 英雄
        for (var i = 0; i < 30; ++i) {
            idArray.push(1001 + i);
        }

        // 怪物
        for (var i = 0; i < 22; i++) {
            // exclude
            if (i === 1) {
                continue;
            }

            idArray.push(10001 + i);
        }

        for (var i = 0, size = idArray.length; i < size; i++) {
            var id = idArray[i];
            var path = "assets/actors/" + id + "/poacher.sk";

            actorResources[id] = {
                id: id,
                path: path
            }
        }

        return actorResources;
    }());

    resource.effects = (function() {
        var effectResources = {};
        var idArray = [];

        // 墓碑
        idArray.push(99999);

        // 100X
        for (var i = 1001; i <= 1008; ++i) {
            idArray.push(i);
        }

        // 2000X
        for (var i = 20001; i <= 20030; ++i) {
            idArray.push(i);
        }

        // 3000X
        for (var i = 30001; i <= 30026; ++i) {
            if (i == 30007 || i == 30008 || i == 30009 ) {
                continue;
            }
            idArray.push(i);
        }

        // 4000X
        for (var i = 40001; i <= 40004; ++i) {
            idArray.push(i);
        }

        for (var i = 0, size = idArray.length; i < size; i++) {
            var id = idArray[i];
            var path = "assets/effects/" + id + "/poacher.sk";

            effectResources[id] = {
                id: id,
                path: path
            }
        }
        return effectResources;
    }());

}(Narwhale));