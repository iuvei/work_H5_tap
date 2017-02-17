var ArtifactDialog = (function(_super){
    function ArtifactDialog(artifactKey){
        ArtifactDialog.super(this);

        this.artifactKey = artifactKey;

        this.initView();
        this.initEvent();
    }

    Laya.class(ArtifactDialog,"ArtifactDialog",_super);

    ArtifactDialog.prototype.initEvent = function () {
        var closeBtn = this.getChildByName("close");
        closeBtn.on(Laya.Event.CLICK, this, this.close);

        this.saleArtifactBtn.on(Laya.Event.CLICK, this, this.saleArtifact);
    };

    ArtifactDialog.prototype.initView = function () {
        var player = App.player;
        var artifact = player.findArtifact(this.artifactKey);

        var name                = "";
        var level               = "";
        var effect              = "";
        var nextLevelEffect     = "";
        var desc                = "";
        var consume             = "";
        var saleCost            = "";
        var isNotForSale        = false;
        var iconSkin            = this.icon.skin;

        if (artifact) {
            name                = artifact.getName();
            level               = artifact.getLevel();
            effect              = artifact.getEffectDesc();
            nextLevelEffect     = artifact.getEffectDesc(level + 1);
            desc                = artifact.getDescribe();
            consume             = artifact.getConsume();
            saleCost            = artifact.getSaleCost();
            isNotForSale        = artifact.isNotForSale();
            iconSkin            = "assets/icons/artifacts/" + artifact.id + ".jpg";
        }

        this.nameLab.text               = name;
        this.levelLabel.text            = level;
        this.effectLabel_1.text         = effect;
        this.effectLabel_2.text         = "";
        this.nextLevelEffect_1.text     = nextLevelEffect;
        this.nextLevelEffect_2.text     = "";
        this.descLabel.text             = desc;
        this.diamondLabel.text          = saleCost;
        this.relicsLabel.text           = consume;
        this.icon.skin                  = iconSkin;

        if (isNotForSale) {
            //*非卖品
            this.saleArtifactBtn.visible = false;
        }
        else {
            this.saleArtifactBtn.visible = true;
        }
    };

    //*出售神器
    ArtifactDialog.prototype.saleArtifact = function () {
        var data = {};
        data.key = this.artifactKey;
        var route = "artifact.sale";
        var player = App.player;
        var self = this;

        var haveArtifact = player.findArtifact(this.artifactKey);
        if (!haveArtifact) {
            App.uiManager.showDialogByErrCode({number:Game.Code.GAME_ERR.NOT_ARTIFACT});
            return;
        }

        App.netManager.send(route, data, Laya.Handler.create(null, function(err, data) {
            if(err){
                App.uiManager.showDialogByErrCode(err);
            }
            else{
                player.syncPlayer(data);
                self.close();
            }
        }));
    };

    ArtifactDialog.prototype.close = function () {
        _super.prototype.close.call(this);
        App.uiManager.removeUiLayer(this);
    };

    return ArtifactDialog;
})(ArtifactDialogUI);
