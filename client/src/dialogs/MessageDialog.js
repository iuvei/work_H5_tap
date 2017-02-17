var MessageDialog = (function(_super) {
    function MessageDialog() {
        MessageDialog.super(this);
    }

    Laya.class(MessageDialog, "MessageDialog", _super);

    MessageDialog.prototype.init = function(subject, content, handler) {
        this.textSubject.text = subject || "";
        this.textContent.text = content || "";
        this.handler = handler;

        this.closeHandler = new Laya.Handler(this, this.onClose);
    };

    MessageDialog.prototype.onClose = function(name) {
        if (this.handler != null) {
            this.handler.run();
        }
    };

    return MessageDialog;
}(MessageDialogUI));