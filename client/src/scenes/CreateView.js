var CreateView = (function(_super) {
    function CreateView() {
        CreateView.super(this);

        this.init();
    }

    Laya.class(CreateView, "CreateView", _super);

    CreateView.prototype.init = function() {
        this.btnEnter.on(Laya.Event.MOUSE_DOWN, this, this.onSubmit);
    };

    CreateView.prototype.onSubmit = function() {
        var name = this.inputName.text || "强力MT";
        App.createPlayer(name);
    };

    return CreateView;
}(CreateViewUI));