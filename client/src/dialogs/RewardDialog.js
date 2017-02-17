var RewardDialog = (function(_super){
    function RewardDialog(rewardObj){
        //*[{type:,num:,key:,},{},{}]
        RewardDialog.super(this);

        this._rewardObj = rewardObj;

        this.init();
    }

    Laya.class(RewardDialog,"RewardDialog",_super);

    RewardDialog.prototype.init = function () {
        this._willShowActionTotal = 0;
        this._colorLayer = null;

        var bgEffect = SpineEffect.create(300052);
        if (bgEffect) {
            bgEffect.play();
            this.effectSprite.addChild(bgEffect);
        }

        this._colorLayer = new Laya.Sprite();
        this._colorLayer.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#FFFFFF");
        this.addChild(this._colorLayer);

        this.resolveRewardObj();
        this.showRewardActions();
    };

    RewardDialog.prototype.resolveRewardObj = function () {
        this._showRewardList = [];
        this._willShowActionTotal = this._rewardObj.length;
        var rewardTypeList = UIManager.REWARD_TYPE;
        var player = App.player;

        for (var index in this._rewardObj) {
            var rewardInfo = this._rewardObj[index];
            var rewardType = rewardInfo.type;
            var artifactKey = rewardInfo.key;
            var rewardNum = rewardInfo.num;
            var willShowInfo = {
                text: "",
                skin: ""
            };
            switch (rewardType) {
                case rewardTypeList.ARTIFACT: {
                    if (!artifactKey) {
                        continue;
                    }

                    var artifact = player.findArtifact(artifactKey);
                    if (artifact) {
                        var name = artifact.getName();
                        var id = artifact.id;
                        willShowInfo.text = name;
                        willShowInfo.skin = App.uiManager.getArtifactImagePath(id);
                    }
                    break;
                }

                case rewardTypeList.GOLD: {
                    willShowInfo.text = "金币 X " + rewardNum;
                    break;
                }

                case rewardTypeList.DIAMOND: {
                    willShowInfo.text = "钻石 X " + rewardNum;
                    break;
                }

                case rewardTypeList.RELICS: {
                    willShowInfo.text = "荣誉 X " + rewardNum;
                    break;
                }

                default: {

                    break;
                }
            }
            this._showRewardList.push(willShowInfo);
        }

    };

    RewardDialog.prototype.colorFlicker = function () {
        var fadeAction_1 = FadeTo.create(0.3,1);
        var fadeAction = FadeTo.create(0.3,0);
        var squ = Sequence.create(fadeAction_1, fadeAction);
        App.actionManager.runAction(squ, this._colorLayer);
    };

    RewardDialog.prototype.updateShowInfo = function () {
        if (this._willShowActionTotal > 0) {
            var index = this._willShowActionTotal - 1;
            var showInfo = this._showRewardList[index];
            var skin = showInfo.skin;
            var text = showInfo.text;

            this.rewardIcon.skin = skin;
            this.rewardText.text = text;
        }
    };
    
    RewardDialog.prototype.showRewardActions = function () {
        this.colorFlicker();
        this.updateShowInfo();
        this._willShowActionTotal--;
    };
    
    RewardDialog.prototype.close = function () {
        if (this._willShowActionTotal <= 0) {
            _super.prototype.close.call(this);
            App.uiManager.removeUiLayer(this);
        }
        else {
            this.showRewardActions();
        }
    };
    
    return RewardDialog;
})(RewardDialogUI);