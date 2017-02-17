var SceneTab = (function(_super) {
    function SceneTab(matrix) {
        SceneTab.super(this);

        this.matrix = matrix;
        this.tabs = matrix;
        this.selected = -1;

        this.init();
    }

    Laya.class(SceneTab, "SceneTab", _super);

    SceneTab.prototype.init = function() {
        for (var index = SceneTab.TAB_START; index < SceneTab.TAB_MAX; index++) {
            var tab = this.tabs[index];
            tab[SceneTab.STATE_INACTIVE].on(Laya.Event.CLICK, this, this.onClick, [index]);
        }
    };

    SceneTab.prototype.active = function(index) {
        this.tabs[index][SceneTab.STATE_ACTIVE].visible = true;
        this.tabs[index][SceneTab.STATE_INACTIVE].visible = false;
    };

    SceneTab.prototype.deactive = function(index) {
        this.tabs[index][SceneTab.STATE_ACTIVE].visible = false;
        this.tabs[index][SceneTab.STATE_INACTIVE].visible = true;
    };

    SceneTab.prototype.reset = function() {
        if (this.selected != SceneTab.TAB_NULL) {
            this.deactive(this.selected);
        }

        this.selected = SceneTab.TAB_NULL;
    };

    SceneTab.prototype.onClick = function(selectIndex) {
        if (this.selected != SceneTab.TAB_NULL) {
            this.deactive(this.selected);
        }

        this.active(selectIndex);
        this.selected = selectIndex;

        this.event(Laya.Event.SELECT, selectIndex);
    };

    SceneTab.STATE_INACTIVE = 0;
    SceneTab.STATE_ACTIVE = 1;

    SceneTab.TAB_NULL = -1;
    SceneTab.TAB_START = 0;
    SceneTab.TAB_TANK = 0;
    SceneTab.TAB_HERO = 1;
    SceneTab.TAB_ARTIFCAT = 2;
    SceneTab.TAB_DIAMOND = 3;
    SceneTab.TAB_MAX = 4;

    return SceneTab;
}(laya.events.EventDispatcher));