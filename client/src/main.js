var window = window || global;
var Game = window.Game || hGame006;

(function (root) {
    // 设计宽度和高度
    var designW = 640;
    var designH = 1136;

    // 初始化Laya
    Laya.init(designW, designH, Laya.WebGL);
       
    // 设置屏幕缩放模式
    Laya.stage.scaleMode = laya.display.Stage.SCALE_SHOWALL;
       
    // 设置屏幕为竖屏幕模式
    Laya.stage.screenMode = laya.display.Stage.SCREEN_VERTICAL;
       
    // 设置舞台的对齐方式
    Laya.stage.alignH = laya.display.Stage.ALIGN_CENTER;
    Laya.stage.alignV = laya.display.Stage.ALIGN_MIDDLE;


    // 创建应用
    var app = window.App = Application;

    // 加载配置文件
    Laya.loader.load("project.json", Laya.Handler.create(null, Main));

    // 主程序入口
    function Main() {
        var config = app.config = Laya.loader.getRes("project.json");

        // 打开监视窗口
        if (config.showFPS) {
            Laya.Stat.show();
        }

        // 初始化应用
        app.init();

        // 预先加载加载画面的资源
        Laya.loader.load(root.loaderRes, Laya.Handler.create(window.App, window.App.start));
    }
}(Narwhale));
