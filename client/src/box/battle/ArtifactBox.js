var ArtifactBox = (function(_super) {
    function ArtifactBox() {
        ArtifactBox.super(this);

        this.initEvent();
    }

    Laya.class(ArtifactBox, "ArtifactBox", _super);

    ArtifactBox.renderHandler = function(cell, index) {
        cell.onRender(cell.dataSource);
    };

    ArtifactBox.prototype.initEvent = function () {
        this.buyArtifactBtn.on(Laya.Event.CLICK, this, this.buyNewArtifact);
        this.upgradeBtn.on(Laya.Event.CLICK, this, this.upgradeArtifact);
        this.artifactInfoImage.on(Laya.Event.CLICK, this, this.showArtifactDetails);
        var player = App.player;
        player.on(Game.Player.UPDATERELIC, this, this.updateUpgradeBtnState);
    };

    ArtifactBox.prototype.onRender = function(data) {
        var player = App.player;
        var buyCostStr = "";
        var buyCost = 0;
        var upgradeCostStr = "";
        var upgradeCost = 0;
        var name = "";
        var effectStr = "";
        var level = 0;
        var skin = null;

        this.boxType = data.boxType;
        this.artifactObj = data.artifactObj || {};

        switch (this.boxType) {
            case ArtifactBox.BOXTYPE_BUY: {
                this.upgradeBtn.visible = false;
                this.buyArtifactBtn.visible = true;

                //*当前购买神器价格
                buyCost = player.buyArtifactCost();
                buyCostStr = Narwhale.Config.formatNumber(buyCost);
                break;
            }

            case ArtifactBox.BOXTYPE_ARTIFACT: {
                this.upgradeBtn.visible = true;
                this.buyArtifactBtn.visible = false;

                name = this.artifactObj.getName() || name;
                effectStr = this.artifactObj.getEffectDesc() || effectStr;
                level = this.artifactObj.getLevel() || level;
                upgradeCost = this.artifactObj.getCost() || upgradeCost;
                upgradeCostStr = Narwhale.Config.formatNumber(upgradeCost);

                var id = this.artifactObj.id;
                if (id) {
                    skin = App.uiManager.getArtifactImagePath(id);
                }

                this.artifactKey = this.artifactObj.key;
                break;
            }
        }

        this.nameLabel.text = name;
        this.levelLabel.text = level;
        this.effectLabel.text = effectStr;
        this.artifactIcon.skin = skin || this.artifactIcon.skin;
        this.costLabel.text = upgradeCostStr;
        this.reliceLabel.text = buyCostStr;

        this.updateUpgradeBtnState();
    };

    //*更新升级按钮状态
    ArtifactBox.prototype.updateUpgradeBtnState = function () {
        var player = App.player;
        if (this.boxType == ArtifactBox.BOXTYPE_ARTIFACT) {
            var artifact = player.findArtifact(this.artifactKey);
            var playerRelics = player.relics;
            if (artifact) {
                var level = artifact.getLevel();
                var maxLevel = artifact.getMaxLevel();
                var cost = artifact.getCost();
                if (maxLevel <= -1) {
                    //*无限等级
                    this.upgradeBtn.disabled = false;
                }
                else {
                    if (cost > playerRelics) {
                        this.upgradeBtn.disabled = true;
                    }
                    else {
                        //*够荣誉
                        if (level >= maxLevel) {
                            //*已经满级
                            this.costLabel.text = "";
                            this.upgradeBtn.disabled = true;
                        }
                        else {
                            //*能够继续升级
                            this.upgradeBtn.disabled = false;
                        }
                    }
                }
            }
        }
    };

    ArtifactBox.prototype.buyNewArtifact = function () {
        var data = {};
        var route = "artifact.buy";
        var player = App.player;
        var self = this;
        this.setBuyBtnEnabled(false);
        App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if(err){
                App.uiManager.showDialogByErrCode(err);
            }
            else{
                player.syncPlayer(data);
                //*奖励显示
                App.uiManager.showRewardPanel([{type: UIManager.REWARD_TYPE.ARTIFACT, key: data.artifacts[0].key}]);
            }
            self.setBuyBtnEnabled(true);
        }));
    };

    ArtifactBox.prototype.upgradeArtifact = function () {
        var data = {};
        data.key = this.artifactKey;
        var route = "artifact.upgrade";
        var player = App.player;

        var haveArtifact = player.findArtifact(this.artifactKey);
        if (!haveArtifact) {
            App.uiManager.showDialogByErrCode({number:Game.Code.GAME_ERR.NOT_ARTIFACT});
            return;
        }

        App.netManager.send(route, data, Laya.Handler.create(this, function(err, data) {
            if(err){
                App.uiManager.showDialogByErrCode(err);
            }
            else{
                player.syncPlayer(data);
                this.doUpgradeEffect();
            }
        }));
    };
    
    ArtifactBox.prototype.showArtifactDetails = function () {
        if(!this.artifactKey){
            return;
        }
        var artifactDialog = new ArtifactDialog(this.artifactKey);
        App.uiManager.addUiLayer(artifactDialog,{isAddShield:true,alpha:0,isDispose:true});
    };

    ArtifactBox.prototype.setBuyBtnEnabled = function (btnEnabled) {
        this.buyArtifactBtn.enabled = btnEnabled;
    };

    ArtifactBox.prototype.doUpgradeEffect = function(){
        var effect = SpineEffect.create(300041);
        if (effect != null) {
            effect.play();
            this.artifactIcon.addChild(effect);
        }
        effect.x = 30;
        effect.y = 70;
    };
    ArtifactBox.BOXTYPE_BUY = "buyArtifact";
    ArtifactBox.BOXTYPE_ARTIFACT = "Artifact";

    return ArtifactBox;
}(ArtifactBoxUI));