
(function(root) {

    var loaderRes = root.loaderRes = [
            {
                url: "assets/loader/bg_loader.jpg",
                type: Laya.Loader.IMAGE
            },
            {
                url: "assets/loader/progress.png",
                type: Laya.Loader.IMAGE
            },
            {
                url: "assets/loader/progress$bar.png",
                type: Laya.Loader.IMAGE
            }
    ];

    var preload = root.preload = [
            {
                url: "assets/atlas/assets/ui.engine.json",
                type: Laya.Loader.ATLAS
            },

            {
                url: "assets/atlas/assets/ui.common.json",
                type: Laya.Loader.ATLAS
            },

            {
                url: "assets/atlas/assets/ui.scene.json",
                type: Laya.Loader.ATLAS
            },

            {
                url: "assets/atlas/assets/ui.battle.json",
                type: Laya.Loader.ATLAS
            },

            {
                url: "assets/atlas/assets/ui.loading.json",
                type: Laya.Loader.ATLAS
            },

            {
                url: "assets/atlas/assets/ui.message.json",
                type: Laya.Loader.ATLAS
            }
    ];

    var fntPreLoad = root.fntPreLoad = [
        {
            url:"assets/fonts/red.fnt",
            name: "red"
        },

        {
            url:"assets/fonts/yellow.fnt",
            name: "yellow"
        },

        {
            url:"assets/fonts/white.fnt",
            name: "white"
        },

    ];

    (function() {

    }());
}(Narwhale));