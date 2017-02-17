
var VIEWVISIBLE = -1 ;			//隐藏层
var VIEWORDER = 0;				//view层次
var VIEWLAYERORDER = 1;			//二级界面
var MAINUIORDER = 2;			//主UI层次
var UBATTLELAYERORDER = 10;		//战斗层
var	UILAYERORDER = 50; 			//UI层
var CHATORDER = 60;				//聊天层
var TIPSLAYERORDER = 100;		//提示层

var UIManager = (function(_super) {
    function UIManager() {
        UIManager.super(this);
        this._uiLayers = [];      //记录创建在UI层的节点
        this._viewLayers = [];    //记录创建在二级界面层的节点
    }

    Laya.class(UIManager, "UIManager", _super);
    var _proto = UIManager.prototype;

    UIManager.prototype.init = function() {
        this.msgDlg = new MessageDialog();

        this.event(Narwhale.Event.INITED);
    };

    UIManager.prototype.showMessageDialog = function(subject, content, handler) {
        this.msgDlg.init(subject, content, handler);
        this.msgDlg.show();
        this.msgDlg.zOrder = TIPSLAYERORDER;
        Laya.stage.addChild(this.msgDlg);
    };

    UIManager.prototype.showDialogByErrCode = function (errCodeObj,handler) {
        var errCode = errCodeObj.number;
        var gameErrCode = Game.Code.GAME_ERR;
        var subject = "提示";
        var content = "";

        switch (errCode) {
            case gameErrCode.NOT_ENOUGH_GOLD : {
                content = "金币不足哦！";
                break;
            }

            case gameErrCode.WRONG_SKILL : {
                content = "没有这个技能！";
                break;
            }

            case gameErrCode.ALREADY_LEARN : {
                content = "已经学习该技能！";
                break;
            }

            case gameErrCode.NOT_ENOUGH_LEVEL : {
                content = "未到达等级！";
                break;
            }

            case gameErrCode.SKILL_IS_ON_CD : {
                content = "技能正在冷却中！";
                break;
            }

            case gameErrCode.CANT_EVOLUTION : {
                content = "未到达进化条件！";
                break;
            }

            case gameErrCode.NOT_ENOUGH_RELIC : {
                content = "荣誉不足！";
                break;
            }

            case gameErrCode.NOT_ENOUGH_DIAMOND : {
                content = "钻石不足！";
                break;
            }

            case gameErrCode.NO_ARTIFACT_BUY : {
                content = "暂无新神器购买！";
                break;
            }

            case gameErrCode.NOT_ARTIFACT : {
                content = "未获得该神器！";
                break;
            }

            case gameErrCode.ARTIFACT_LEVEL_MAX : {
                content = "神器已达到最高级！";
                break;
            }

            case gameErrCode.ARTIFACT_NOT_FOR_SALE : {
                content = "该神器无法出售！";
                break;
            }

            default : {
                content = "错误号：" + errCode;
                break;
            }
        }

        this.showMessageDialog(subject, content, handler);

    };
    //让界面添加颜色屏蔽层(Dialog)
    UIManager.prototype.addShieldLayerDialog = function(layer,alpha,isDispose){
        var isDispose = isDispose || false;
        var alpha = alpha || 0.3;
        //屏蔽层
        var shieldLayer = new Laya.Sprite();
        shieldLayer.alpha = alpha;
        shieldLayer.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        layer.addChild(shieldLayer);
        var layerPos = layer.localToGlobal(Point.p(0,0));
        shieldLayer.x = -layerPos.x;
        shieldLayer.y = -layerPos.y;

        var hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        shieldLayer.hitArea = hitArea;
        shieldLayer.mouseEnabled = true;
        shieldLayer.zOrder = -100;

        if(isDispose){
            var dispose = function(){
                layer.close();
            };
            shieldLayer.on(Laya.Event.CLICK, this, dispose);
        }

        return shieldLayer;
    };

    //让界面添加颜色屏蔽层(View)
    UIManager.prototype.addShieldLayerView = function(layer,alpha,isDispose){
        var isDispose = isDispose || false;
        var alpha = alpha || 0.3;
        //屏蔽层
        var shieldLayer = new Laya.Sprite();
        shieldLayer.alpha = alpha;
        shieldLayer.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        layer.addChild(shieldLayer);

        var hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        shieldLayer.hitArea = hitArea;
        shieldLayer.mouseEnabled = true;
        shieldLayer.zOrder = -100;

        if(isDispose){
            var dispose = function(){
                layer.dispose();
            };
            shieldLayer.on(Laya.Event.CLICK, this, dispose);
        }

        return shieldLayer;
    };

    //添加二级界面
    UIManager.prototype.addViewLayer = function(layer,addShieldObj){
        layer.zOrder = VIEWLAYERORDER;
        this._viewLayers.push(layer);

        if(layer.show){
            //Dialog
            layer.show();
            Laya.stage.addChild(layer);

            if(addShieldObj){
                if(addShieldObj.isAddShield !== undefined){
                    var alpha = addShieldObj.alpha;
                    var isDispose = addShieldObj.isDispose;
                    this.addShieldLayerDialog(layer,alpha,isDispose)
                }
                else{
                    this.addShieldLayerDialog(layer)
                }
            }

        }
        else{
            //View
            Laya.stage.addChild(layer);

            if(addShieldObj){
                if(addShieldObj.isAddShield !== undefined){
                    var alpha = addShieldObj.alpha;
                    var isDispose = addShieldObj.isDispose;
                    this.addShieldLayerView(layer,alpha,isDispose)
                }
                else{
                    this.addShieldLayerView(layer)
                }
            }
        }
    };

    UIManager.prototype.removeViewLayer = function(layer){
        var index = this._viewLayers.indexOf(layer);
        if(index == -1){
            return;
        }
        this._viewLayers.splice(index, 1);
        if(layer.dispose){
            layer.dispose();
        }
    };

    /**
     *添加ui界面
     *@param layer laya.ui.view类型。
     *@param addShieldObj 添加屏蔽的数据 。
     *<b>注意：</b>addShieldObj 可以 bool类型 （是否添加屏蔽层）|| Object类型（添加屏蔽层，所需相关的数据）
     *@return
     */
    UIManager.prototype.addUiLayer = function(layer,addShieldObj){
        layer.zOrder = UILAYERORDER;
        this._uiLayers.push(layer);

        if(layer.show){
            //Dialog
            layer.show();
            Laya.stage.addChild(layer);
            //App.getRunView().addChild(layer);

            if(addShieldObj){
                if(addShieldObj.isAddShield !== undefined){
                    var alpha = addShieldObj.alpha;
                    var isDispose = addShieldObj.isDispose;
                    this.addShieldLayerDialog(layer,alpha,isDispose)
                }
                else{
                    this.addShieldLayerDialog(layer)
                }
            }
        }
        else{
            //View
            Laya.stage.addChild(layer);

            if(addShieldObj){
                if(addShieldObj.isAddShield !== undefined){
                    var alpha = addShieldObj.alpha;
                    var isDispose = addShieldObj.isDispose;
                    this.addShieldLayerView(layer,alpha,isDispose)
                }
                else{
                    this.addShieldLayerView(layer)
                }
            }
        }
    };

    UIManager.prototype.removeUiLayer = function(layer){
        var index = this._uiLayers.indexOf(layer);
        if(index == -1){
            return;
        }
        this._uiLayers.splice(index, 1);
        if(layer.dispose){
            layer.dispose();
        }
    };

    //*显示奖励
    UIManager.prototype.showRewardPanel = function (rewardObj) {
        //*rewardObj:[{type:奖励类型,num:奖励数量,key:神器的key},{}]
        var panel = new RewardDialog(rewardObj);
        this.addUiLayer(panel,{isAddShield:true,alpha:0,isDispose:true});
    };

    //*-------------资源获取start----------------
    //*神器图标路径
    UIManager.prototype.getArtifactImagePath = function (artifactId) {
        if (!artifactId) {
            return;
        }

        var path = "assets/icons/artifacts/" + artifactId + ".jpg";
        return path;
    };


    //*-------------资源获取end------------------

    UIManager.REWARD_TYPE = {
        ARTIFACT: "artifact",
        GOLD: "gold",
        DIAMOND: "diamond",
        RELICS: "relics"
    };

    return UIManager;
}(laya.events.EventDispatcher));