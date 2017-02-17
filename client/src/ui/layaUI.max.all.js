var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var ArtifactBoxUI=(function(_super){
		function ArtifactBoxUI(){
			
		    this.artifactInfoImage=null;
		    this.upgradeBtn=null;
		    this.costLabel=null;
		    this.artifactIcon=null;
		    this.nameLabel=null;
		    this.levelText=null;
		    this.levelLabel=null;
		    this.effectLabel=null;
		    this.upgradeStrText=null;
		    this.buyArtifactBtn=null;
		    this.reliceLabel=null;

			ArtifactBoxUI.__super.call(this);
		}

		CLASS$(ArtifactBoxUI,'ui.Boxes.ArtifactBoxUI',_super);
		var __proto__=ArtifactBoxUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ArtifactBoxUI.uiView);
		}

		STATICATTR$(ArtifactBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":620,"visible":false,"height":100,"font":"20"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"var":"artifactInfoImage","skin":"assets/ui.common/bg_listbox.png","sizeGrid":"20,20,20,20","height":100}},{"type":"Button","props":{"y":16,"x":450,"var":"upgradeBtn","stateNum":"2","skin":"assets/ui.common/button_upgrade_green_plus1.png"},"child":[{"type":"Image","props":{"y":-8.99999999999995,"x":33.99999999999994,"skin":"assets/ui.common/artifactIcon_2.png"}},{"type":"Text","props":{"y":-1,"x":74,"width":89,"var":"costLabel","text":"10000","height":29,"fontSize":"18","font":"Arial","color":"#ffffff","align":"left"}}]},{"type":"Image","props":{"y":50,"x":56,"width":80,"skin":"assets/ui.common/frame_grey.png","height":80,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":5,"x":4,"width":70,"var":"artifactIcon","skin":"assets/ui.common/artifactView.png","height":70}}]},{"type":"Text","props":{"y":14,"x":110,"width":177,"var":"nameLabel","text":"神器名七个字","height":30,"fontSize":"21","font":"Arial","color":"#f4a909"}},{"type":"Text","props":{"y":14,"x":283,"width":56,"var":"levelText","text":"等级:","height":30,"fontSize":"21","font":"Arial","color":"#ffffff"}},{"type":"Text","props":{"y":14,"x":337,"width":99,"var":"levelLabel","text":"100000","height":30,"fontSize":"21","font":"Arial","color":"#03d6ff"}},{"type":"Text","props":{"y":49,"x":110,"width":335,"var":"effectLabel","text":"特效说明","height":46,"fontSize":"18","font":"Arial","color":"#ffffff"}},{"type":"Text","props":{"y":51,"x":454,"width":157,"var":"upgradeStrText","text":"升级","height":29,"fontSize":"21","font":"Arial","color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":15.999999999999984,"x":118.99999999999994,"width":492,"var":"buyArtifactBtn","stateNum":"1","skin":"assets/ui.common/btn_listbox_green.png","sizeGrid":"0,39,0,63","height":71},"child":[{"type":"Text","props":{"y":33.99999999999999,"x":136.99999999999997,"text":"购买下一件神器","fontSize":"30","font":"Arial","color":"#ffffff"}},{"type":"Image","props":{"y":-2.999999999999952,"x":353.00000000000006,"skin":"assets/ui.common/artifactIcon_2.png"}},{"type":"Text","props":{"y":0,"x":389,"width":124,"var":"reliceLabel","text":"5","height":37,"fontSize":"25","font":"Arial","color":"#ffffff","align":"left"}}]}]};}
		]);
		return ArtifactBoxUI;
	})(View);
var DiamondBoxUI=(function(_super){
		function DiamondBoxUI(){
			

			DiamondBoxUI.__super.call(this);
		}

		CLASS$(DiamondBoxUI,'ui.Boxes.DiamondBoxUI',_super);
		var __proto__=DiamondBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DiamondBoxUI.uiView);
		}

		STATICATTR$(DiamondBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":620,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"skin":"assets/ui.common/bg_listbox.png","sizeGrid":"20,20,20,20","height":100}},{"type":"Image","props":{"y":50,"x":50,"width":80,"height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":16,"stateNum":"2","skin":"assets/ui.common/button_upgrade_blue_plus1.png","right":10,"label":"label"}},{"type":"Image","props":{"y":9,"x":10,"skin":"assets/ui.common/frame_grey.png"},"child":[{"type":"Image","props":{"y":4,"x":3,"width":70,"skin":"assets/icons/items/1001.jpg","height":70}}]}]};}
		]);
		return DiamondBoxUI;
	})(View);
var HeroBoxUI=(function(_super){
		function HeroBoxUI(){
			
		    this.bgFrame=null;
		    this.bgIcon=null;
		    this.nameLab=null;
		    this.Lv=null;
		    this.dps=null;
		    this.levelLab=null;
		    this.dpsLab=null;
		    this.skillBox=null;
		    this.timeBox=null;
		    this.timeLab=null;
		    this.dieBg=null;
		    this.btnUpgrade=null;
		    this.costIcon=null;
		    this.textCost=null;
		    this.textMessage=null;
		    this.textValue=null;
		    this.text=null;
		    this.btnUpSkill=null;
		    this.skillcost=null;
		    this.skillname=null;
		    this.skillvalue=null;
		    this.skilltext=null;

			HeroBoxUI.__super.call(this);
		}

		CLASS$(HeroBoxUI,'ui.Boxes.HeroBoxUI',_super);
		var __proto__=HeroBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HeroBoxUI.uiView);
		}

		STATICATTR$(HeroBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":620,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"skin":"assets/ui.common/bg_listbox.png","sizeGrid":"20,20,20,20","name":"backgroud","height":100}},{"type":"Image","props":{"y":50,"x":50,"var":"bgFrame","skin":"assets/ui.common/frame_grey.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":39,"x":39,"width":70,"var":"bgIcon","skin":"assets/icons/heros/1001.jpg","height":70,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":15,"x":100,"width":322,"var":"nameLab","text":"名字可以很长很长哦","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":41,"x":109,"width":53,"var":"Lv","text":"等级：","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":41,"x":234,"width":71,"var":"dps","text":"攻击力：","pivotX":0,"height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5}},{"type":"Label","props":{"y":42,"x":161,"width":56,"var":"levelLab","text":"9999","height":20,"fontSize":20,"color":"#f9c803","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":42.00000000000002,"x":304.00000000000006,"width":144,"var":"dpsLab","text":"1000000000","height":20,"fontSize":20,"color":"#fda14b","anchorY":0.5}},{"type":"Box","props":{"y":57.00000000000002,"x":98.00000000000004,"width":310,"var":"skillBox","height":35},"child":[{"type":"Image","props":{"y":2,"x":5,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item0","height":30}},{"type":"Image","props":{"y":2,"x":43,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item1","height":30}},{"type":"Image","props":{"y":2,"x":81,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item2","height":30}},{"type":"Image","props":{"y":2,"x":119,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item3","height":30}},{"type":"Image","props":{"y":2,"x":195,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item5","height":30}},{"type":"Image","props":{"y":2,"x":157,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item4","height":30}},{"type":"Image","props":{"y":2,"x":233,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item6","height":30}},{"type":"Image","props":{"y":2,"x":271,"width":30,"visible":true,"skin":"assets/icons/skills/square/100001.jpg","name":"item7","height":30}}]},{"type":"Box","props":{"y":55,"x":107,"width":239,"visible":false,"var":"timeBox","height":37},"child":[{"type":"Image","props":{"y":6,"x":8,"skin":"assets/ui.common/grave.png"}},{"type":"Label","props":{"y":20,"x":41,"width":91,"text":"复活时间：","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":22,"x":136,"width":91,"var":"timeLab","text":"99:99:99","height":20,"fontSize":20,"font":"SimHei","color":"#ff0400","anchorY":0.5,"anchorX":0}}]},{"type":"Image","props":{"y":0,"x":-1,"width":622,"visible":false,"var":"dieBg","skin":"assets/ui.common/heroDieBg.png","mouseEnabled":true,"height":102},"child":[{"type":"Image","props":{"y":9.999999999999979,"x":6.999999999999936,"skin":"assets/ui.common/dieIcon.png"}}]},{"type":"Button","props":{"y":17.000000000000004,"x":450,"var":"btnUpgrade","stateNum":"2","skin":"assets/ui.common/button_upgrade_blue_plus1.png"},"child":[{"type":"Image","props":{"y":11,"x":49,"var":"costIcon","skin":"assets/ui.common/money_copper_2.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":11,"x":61,"var":"textCost","valign":"middle","text":"123.45E+789","fontSize":14,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"left"}},{"type":"Label","props":{"y":34,"x":81,"width":60,"var":"textMessage","valign":"middle","text":"等级提升","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":55,"x":81,"width":150,"var":"textValue","valign":"middle","text":"+123.45E+789","fontSize":16,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":44,"x":81,"width":150,"var":"text","valign":"middle","height":38,"fontSize":26,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Button","props":{"y":17,"x":450,"visible":false,"var":"btnUpSkill","stateNum":"2","skin":"assets/ui.common/button_upgrade_yellow_plus1.png"},"child":[{"type":"Image","props":{"y":12,"x":42,"width":16,"skin":"assets/ui.common/money_copper.png","height":16,"anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":11,"x":61,"var":"skillcost","valign":"middle","text":"123.45E+789","fontSize":14,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"left"}},{"type":"Label","props":{"y":34,"x":81,"width":112,"var":"skillname","valign":"middle","text":"开启等级提升","height":17,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":55,"x":81,"width":150,"var":"skillvalue","valign":"middle","text":"+123.45E+789","fontSize":16,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":45,"x":79,"width":150,"var":"skilltext","valign":"middle","height":38,"fontSize":26,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]}]};}
		]);
		return HeroBoxUI;
	})(View);
var LevelIconBoxUI=(function(_super){
		function LevelIconBoxUI(){
			
		    this.iconNode=null;
		    this.level=null;

			LevelIconBoxUI.__super.call(this);
		}

		CLASS$(LevelIconBoxUI,'ui.Boxes.LevelIconBoxUI',_super);
		var __proto__=LevelIconBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LevelIconBoxUI.uiView);
		}

		STATICATTR$(LevelIconBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Sprite","props":{"y":17,"x":0,"var":"iconNode"}},{"type":"Image","props":{"y":17,"x":0,"skin":"assets/ui.battle/bg_level_frame.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":-23,"x":0,"width":116,"var":"level","text":"9","name":"level","height":28,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return LevelIconBoxUI;
	})(View);
var LevelTipBoxUI=(function(_super){
		function LevelTipBoxUI(){
			
		    this.levelNameLab=null;

			LevelTipBoxUI.__super.call(this);
		}

		CLASS$(LevelTipBoxUI,'ui.Boxes.LevelTipBoxUI',_super);
		var __proto__=LevelTipBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LevelTipBoxUI.uiView);
		}

		STATICATTR$(LevelTipBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"assets/ui.common/unlocked.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":16,"x":0,"width":436,"var":"levelNameLab","text":"label","height":35,"fontSize":35,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return LevelTipBoxUI;
	})(View);
var ServerNameBoxUI=(function(_super){
		function ServerNameBoxUI(){
			

			ServerNameBoxUI.__super.call(this);
		}

		CLASS$(ServerNameBoxUI,'ui.Boxes.ServerNameBoxUI',_super);
		var __proto__=ServerNameBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ServerNameBoxUI.uiView);
		}

		STATICATTR$(ServerNameBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":260,"height":50},"child":[{"type":"Image","props":{"width":260,"skin":"assets/ui.common/bg_listbox.png","name":"backgroud","height":50}},{"type":"Label","props":{"width":260,"valign":"middle","text":"s1 服务器名称","name":"server","height":50,"fontSize":30,"color":"#fbe705","align":"center"}}]};}
		]);
		return ServerNameBoxUI;
	})(View);
var TankBoxUI=(function(_super){
		function TankBoxUI(){
			
		    this.backgroud=null;
		    this.boxTank=null;
		    this.bgFrame=null;
		    this.bgIcon=null;
		    this.textDesc=null;
		    this.textLevel=null;
		    this.textName=null;
		    this.btnX100=null;
		    this.btnX10=null;
		    this.boxSkill=null;
		    this.bgFrame=null;
		    this.bgIcon=null;
		    this.boxEvolution=null;
		    this.bgFrame=null;
		    this.bgIcon=null;
		    this.btnUpgrade=null;
		    this.bgCopper=null;
		    this.textCost=null;
		    this.textMessage=null;
		    this.textValue=null;

			TankBoxUI.__super.call(this);
		}

		CLASS$(TankBoxUI,'ui.Boxes.TankBoxUI',_super);
		var __proto__=TankBoxUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TankBoxUI.uiView);
		}

		STATICATTR$(TankBoxUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":620,"height":100},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"var":"backgroud","skin":"assets/ui.common/bg_listbox.png","sizeGrid":"20,20,20,20","mouseEnabled":true,"height":100}},{"type":"Box","props":{"width":620,"var":"boxTank","mouseThrough":true,"mouseEnabled":false,"height":100},"child":[{"type":"Image","props":{"y":50,"x":50,"var":"bgFrame","skin":"assets/ui.common/frame_grey.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":4,"x":4,"width":70,"var":"bgIcon","skin":"assets/icons/tank/10001.png","height":70}}]},{"type":"Label","props":{"y":80,"x":110,"var":"textDesc","valign":"middle","text":"点击攻击力：123.45E+789","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"center"}},{"type":"Label","props":{"y":50,"x":110,"var":"textLevel","valign":"middle","text":"等级：99999","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"center"}},{"type":"Label","props":{"y":18,"x":110,"width":150,"var":"textName","valign":"middle","text":"名字有七个字","height":24,"fontSize":24,"color":"#bbd728","anchorY":0.5,"anchorX":0,"align":"left"}},{"type":"Button","props":{"y":16,"x":195,"visible":false,"var":"btnX100","stateNum":"2","skin":"assets/ui.common/button_upgrade_orange_plusN.png"}},{"type":"Button","props":{"y":16,"x":322,"visible":false,"var":"btnX10","stateNum":"2","skin":"assets/ui.common/button_upgrade_orange_plusN.png"}}]},{"type":"Box","props":{"width":620,"var":"boxSkill","height":100},"child":[{"type":"Image","props":{"y":50,"x":50,"var":"bgFrame","skin":"assets/ui.common/frame_grey.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":4,"x":4,"width":70,"var":"bgIcon","skin":"assets/icons/tank/10001.png","height":70}}]}]},{"type":"Box","props":{"width":620,"var":"boxEvolution","height":100},"child":[{"type":"Image","props":{"y":50,"x":50,"var":"bgFrame","skin":"assets/ui.common/frame_grey.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":4,"x":4,"width":70,"var":"bgIcon","skin":"assets/icons/tank/10001.png","height":70}}]}]},{"type":"Button","props":{"y":16,"x":450,"var":"btnUpgrade","stateNum":"2","skin":"assets/ui.common/button_upgrade_orange_plus1.png","disabled":false},"child":[{"type":"Image","props":{"y":10,"x":50,"width":16,"var":"bgCopper","skin":"assets/ui.common/money_copper.png","height":16,"anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":9,"x":69,"var":"textCost","valign":"middle","text":"123.45E+789","fontSize":14,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"left"}},{"type":"Label","props":{"y":34,"x":82,"width":91,"var":"textMessage","valign":"middle","text":"等级提升","height":12,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":53,"x":6,"width":150,"var":"textValue","valign":"middle","text":"+123.45E+789","height":16,"fontSize":16,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"center"}}]}]};}
		]);
		return TankBoxUI;
	})(View);
var AchieveDialogUI=(function(_super){
		function AchieveDialogUI(){
			

			AchieveDialogUI.__super.call(this);
		}

		CLASS$(AchieveDialogUI,'ui.Dialogs.AchieveDialogUI',_super);
		var __proto__=AchieveDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AchieveDialogUI.uiView);
		}

		STATICATTR$(AchieveDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"sizeGrid":"20,0,0,0","height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":800}},{"type":"Image","props":{"y":130,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":660},"child":[{"type":"Box","props":{"width":580,"height":660},"child":[{"type":"Box","props":{"y":20,"x":10},"child":[{"type":"Image","props":{"width":560,"skin":"assets/ui.common/bg_listbox.png","name":"BannerFrame","height":95}},{"type":"Image","props":{"y":8,"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","name":"achieveIcon"}},{"type":"Label","props":{"y":10,"x":100,"text":"消灭N只怪物","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":40,"x":100,"width":27,"text":"进度：1.00K/1.00K","height":35,"fontSize":16,"color":"#ffffff"}},{"type":"Button","props":{"top":12,"stateNum":2,"skin":"assets/ui.common/button_upgrade_blue_plus1.png","right":10,"label":"label"}}]}]}]},{"type":"Box","props":{"y":0,"x":0,"width":600,"name":"template/Dialog/ShopBanner","height":120},"child":[{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"template/Dialog/label"}},{"type":"Label","props":{"y":20,"x":20,"text":"成就","fontSize":40,"color":"#ffffff"}},{"type":"Image","props":{"y":88,"x":337,"skin":"assets/ui.common/label.png","scaleY":0.7,"scaleX":0.5}},{"type":"Image","props":{"y":88,"x":317,"skin":"assets/ui.common/diamond_2.png"}},{"type":"Button","props":{"y":88,"x":437,"skin":"assets/ui.common/button_plus.png","scaleY":0.6,"scaleX":0.6,"label":"template/Dialog/label"}},{"type":"Label","props":{"y":80,"x":30,"text":"完成成就获取奖励！","name":"txt","fontSize":30,"color":"#fffff"}}]}]};}
		]);
		return AchieveDialogUI;
	})(Dialog);
var ActivityDialogUI=(function(_super){
		function ActivityDialogUI(){
			

			ActivityDialogUI.__super.call(this);
		}

		CLASS$(ActivityDialogUI,'ui.Dialogs.ActivityDialogUI',_super);
		var __proto__=ActivityDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ActivityDialogUI.uiView);
		}

		STATICATTR$(ActivityDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":800},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":800}},{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":689}},{"type":"Box","props":{"y":110,"x":10,"width":580,"height":680}},{"type":"Label","props":{"y":30,"x":30,"text":"活动","fontSize":40,"color":"#ffffff"}},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"label"}}]};}
		]);
		return ActivityDialogUI;
	})(Dialog);
var ArtifactDialogUI=(function(_super){
		function ArtifactDialogUI(){
			
		    this.icon=null;
		    this.nameLab=null;
		    this.levelLabel=null;
		    this.effectLabel_1=null;
		    this.effectLabel_2=null;
		    this.nextLevelEffect_1=null;
		    this.nextLevelEffect_2=null;
		    this.descLabel=null;
		    this.saleArtifactBtn=null;
		    this.diamondLabel=null;
		    this.relicsLabel=null;

			ArtifactDialogUI.__super.call(this);
		}

		CLASS$(ArtifactDialogUI,'ui.Dialogs.ArtifactDialogUI',_super);
		var __proto__=ArtifactDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ArtifactDialogUI.uiView);
		}

		STATICATTR$(ArtifactDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"mouseThrough":true,"mouseEnabled":true,"height":600},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","mouseEnabled":true,"height":600}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","mouseEnabled":true,"height":260},"child":[{"type":"Image","props":{"y":23,"x":23,"width":72,"var":"icon","skin":"assets/icons/artifacts/1031.jpg","height":72}},{"type":"Image","props":{"y":20,"x":20,"skin":"assets/ui.common/Frame_hero_grey.png"}},{"type":"Box","props":{"y":20,"x":120,"width":440,"name":"TXT","height":250},"child":[{"type":"Label","props":{"var":"nameLab","text":"神器名字","fontSize":36,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":50,"x":0,"text":"等级：","name":"Lv.","fontSize":20,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":50,"x":60,"var":"levelLabel","text":"9999","fontSize":20,"font":"Arial","color":"#03f9dc"}},{"type":"Label","props":{"y":80,"x":0,"width":439,"var":"effectLabel_1","text":"+0次XXXXXX","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":110,"x":0,"width":444,"var":"effectLabel_2","text":"+0次XXXXXX","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Image","props":{"y":140,"width":440,"skin":"assets/ui.common/bg_darkgrey.png","height":100},"child":[{"type":"Label","props":{"y":10,"x":10,"text":"下一等级：","name":"Lv.","fontSize":20,"color":"#5d9dff","bold":true}},{"type":"Label","props":{"y":40,"x":10,"width":408,"var":"nextLevelEffect_1","text":"+5次XXXXXX","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":10,"width":417,"var":"nextLevelEffect_2","text":"+10次XXXXXX","height":20,"fontSize":20,"color":"#ffffff"}}]}]}]},{"type":"Image","props":{"y":280,"x":20,"width":560,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":200},"child":[{"type":"TextArea","props":{"y":20,"x":10,"width":540,"var":"descLabel","text":"好多骷髅啊骷髅啊骷髅啊啊啊啊啊啊啊啊啊啊啊 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊 啊啊啊啊啊啊啊 啊啊啊啊啊啊啊啊","fontSize":18,"color":"#ffffff"}}]},{"type":"Image","props":{"x":110,"skin":"assets/ui.common/bg_listbox.png","scaleY":0.6,"scaleX":0.6,"bottom":30},"child":[{"type":"Label","props":{"y":30,"x":160,"text":"非卖品，无法出售","fontSize":36,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":29.99999999999999,"x":516,"top":20,"skin":"assets/ui.common/image_close_black.png","right":20,"name":"close"}},{"type":"Button","props":{"y":510,"x":110,"width":370,"var":"saleArtifactBtn","skin":"assets/ui.common/button_reborn_red.png","height":61,"bottom":29},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"重新利用将消耗","fontSize":18,"color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":220,"var":"diamondLabel","text":"9999999999","fontSize":18,"color":"#ffffff"}},{"type":"Image","props":{"y":10,"x":180,"skin":"assets/ui.common/money_diamond_2.png","scaleY":0.7,"scaleX":0.7}},{"type":"Label","props":{"x":30,"text":"出售获得","fontSize":18,"color":"#ffffff","bottom":10}},{"type":"Label","props":{"x":220,"var":"relicsLabel","text":"+9999999999","fontSize":18,"color":"#ffffff","bottom":10}},{"type":"Image","props":{"y":30,"x":180,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"bottom":3}}]}]};}
		]);
		return ArtifactDialogUI;
	})(Dialog);
var BlueGragonDialogUI=(function(_super){
		function BlueGragonDialogUI(){
			

			BlueGragonDialogUI.__super.call(this);
		}

		CLASS$(BlueGragonDialogUI,'ui.Dialogs.BlueGragonDialogUI',_super);
		var __proto__=BlueGragonDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(BlueGragonDialogUI.uiView);
		}

		STATICATTR$(BlueGragonDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":560,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":560,"skin":"assets/ui.Boss_BlueDragon/bg_BlueGragonS.png","height":900},"child":[{"type":"Image","props":{"y":252,"x":131,"skin":"assets/ui.Boss_BlueDragon/image_BlueGragon.png","scaleY":0.8,"scaleX":0.85}},{"type":"Image","props":{"y":473,"x":61,"skin":"assets/ui.Boss_BlueDragon/image_line.png"}}]},{"type":"Box","props":{"width":560,"name":"Top","height":200},"child":[{"type":"Label","props":{"y":33,"x":184,"text":"蓝龙入侵","fontSize":40,"color":"#ffffff","bold":true}},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"label"}},{"type":"TextArea","props":{"y":94,"x":20,"width":560,"text":"        蓝龙携带着大量荣誉准备于中午12：00、晚上18：00逃离大陆。利用上古神器可以对其造成巨大伤害。据说，对其伤害越高，能够获取更多他所携带的荣誉。。。。。。","right":20,"left":20,"height":119,"fontSize":24,"color":"#ffffff","bold":false}}]},{"type":"Box","props":{"y":484,"x":52,"width":460,"name":"RankingList","height":200},"child":[{"type":"Label","props":{"y":4,"x":180,"text":"排行榜","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":40,"x":30,"text":"1、XXXX XXX              单次伤害999.99TT","name":"1","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":66,"x":30,"text":"1、XXXX XXX              单次伤害999.99TT","name":"1","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":92,"x":30,"text":"1、XXXX XXX              单次伤害999.99TT","name":"1","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":104,"x":186.1416015625,"text":". . . . . .","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":130,"x":30,"text":"您的排名999           最高单次伤害999.99TT","name":"me","fontSize":20,"color":"#fffffff"}},{"type":"Label","props":{"y":160,"x":169,"text":"更多排名","name":"more","fontSize":24,"color":"#ffffff","bold":true}}]},{"type":"Box","props":{"y":678,"x":47,"width":460,"name":"Time&Start","height":200},"child":[{"type":"Label","props":{"y":10,"x":26,"text":"开始时间59：59/结束时间59：59","fontSize":28,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":80,"x":30,"text":"挑战剩余次数1/3","fontSize":28,"color":"#ffffff"}},{"type":"Image","props":{"y":124,"x":40,"skin":"assets/ui.common/money_diamond_2.png"}},{"type":"Image","props":{"y":120,"x":85,"skin":"assets/ui.common/e_0007_圆角矩形-5.png","scaleY":0.9,"scaleX":0.5}},{"type":"Label","props":{"y":124,"x":108,"text":"99999","fontSize":26,"color":"#ffffff","bold":true}},{"type":"Button","props":{"stateNum":"2","skin":"assets/ui.Boss_BlueDragon/button_enter_on.png","right":30,"label":"label","bottom":50},"child":[{"type":"Label","props":{"y":12,"x":35,"text":"挑战","fontSize":36,"color":"#ffffff","bold":true}}]},{"type":"Button","props":{"y":37.99999999999977,"x":251.99999999999972,"toggle":false,"stateNum":"2","skin":"assets/ui.Boss_BlueDragon/button_enter_off.png","right":30,"label":"label","bottom":50},"child":[{"type":"Label","props":{"y":12,"x":35,"text":"挑战","fontSize":36,"color":"#ffffff","bold":true}}]}]}]};}
		]);
		return BlueGragonDialogUI;
	})(Dialog);
var DailyBossDialogUI=(function(_super){
		function DailyBossDialogUI(){
			

			DailyBossDialogUI.__super.call(this);
		}

		CLASS$(DailyBossDialogUI,'ui.Dialogs.DailyBossDialogUI',_super);
		var __proto__=DailyBossDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DailyBossDialogUI.uiView);
		}

		STATICATTR$(DailyBossDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":560,"staticCache":false,"height":900},"child":[{"type":"Image","props":{"y":0,"x":0,"width":560,"staticCache":"false","skin":"assets/ui.Boss_BlueDragon/bg_DailyBoss.jpg","name":"wholebg","height":900},"child":[{"type":"Image","props":{"x":40,"width":480,"skin":"assets/ui.Boss_BlueDragon/stage.png","name":"Stage","bottom":20}},{"type":"Image","props":{"y":120,"x":40,"skin":"assets/ui.Boss_BlueDragon/baoxiang.png","scaleY":0.8,"scaleX":0.8,"name":"Box"}},{"type":"Image","props":{"width":220,"top":70,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_black.png","right":40,"name":"day1","height":200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":220,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_red.png","height":200}},{"type":"Image","props":{"y":768.7999999999998,"x":201.59999999999985,"width":73,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/tick.png","scaleY":0.8,"scaleX":0.8,"right":0,"height":64,"bottom":10}},{"type":"Image","props":{"y":70,"x":66,"skin":"assets/ui.common/money_diamond_1.png","scaleY":0.8,"scaleX":0.8,"name":"diamond"}},{"type":"Label","props":{"y":140,"x":87,"text":"X15","name":"content","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":6,"x":72,"text":"第一天","name":"day","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":40,"x":26,"text":"奖励","name":"reward ","fontSize":20,"color":"#ffffff","bold":false}}]},{"type":"Image","props":{"x":40,"width":220,"top":276,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_black.png","name":"day2","height":200},"child":[{"type":"Image","props":{"width":220,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_red.png","height":200}},{"type":"Image","props":{"width":73,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/tick.png","scaleY":0.8,"scaleX":0.8,"right":0,"height":64,"bottom":10}},{"type":"Label","props":{"y":6,"x":72,"text":"第二天","name":"day","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":40,"x":26,"text":"奖励","name":"reward ","fontSize":20,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":140,"x":87,"text":"X30","name":"content","fontSize":24,"color":"#ffffff"}},{"type":"Image","props":{"y":70,"x":66,"skin":"assets/ui.common/money_diamond_1.png","scaleY":0.8,"scaleX":0.8,"name":"diamond"}}]},{"type":"Image","props":{"y":276,"width":220,"top":276,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_black.png","right":40,"name":"day3","height":200},"child":[{"type":"Image","props":{"width":220,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_red.png","height":200}},{"type":"Image","props":{"y":562.7999999999998,"x":201.59999999999985,"width":73,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/tick.png","scaleY":0.8,"scaleX":0.8,"right":0,"height":64,"bottom":10}},{"type":"Label","props":{"y":6,"x":72.296875,"text":"第三天","name":"day","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":40,"x":26,"text":"奖励","name":"reward ","fontSize":20,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":138,"x":50,"text":"随机增强道具","name":"content","fontSize":20,"color":"#ffffff"}},{"type":"Image","props":{"y":64,"x":75,"skin":"assets/icons/skills/circle/smash.png","scaleY":0.8,"scaleX":0.8,"name":"secondkill"}},{"type":"Image","props":{"y":59,"x":71,"skin":"assets/ui.battle/bg_skill_CD.png","scaleY":0.8,"scaleX":0.8}}]},{"type":"Image","props":{"x":40,"width":220,"top":470,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_black.png","name":"day4","height":200},"child":[{"type":"Image","props":{"width":220,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_red.png","height":200}},{"type":"Image","props":{"y":368.79999999999984,"x":461.59999999999985,"width":73,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/tick.png","scaleY":0.8,"scaleX":0.8,"right":0,"height":64,"bottom":10}},{"type":"Label","props":{"y":40,"x":26,"text":"奖励","name":"reward ","fontSize":20,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":6,"x":72,"text":"第四天","name":"day","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":140,"x":87,"text":"双飞","name":"content","fontSize":24,"color":"#ffffff"}},{"type":"Image","props":{"y":67,"x":59,"skin":"assets/banners/doublefairy.png","scaleY":0.8,"scaleX":0.8}}]},{"type":"Image","props":{"width":220,"top":470,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_black.png","right":40,"name":"day5","height":200},"child":[{"type":"Image","props":{"width":220,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/bg_dailyboss_red.png","height":200}},{"type":"Image","props":{"y":368.79999999999984,"x":201.59999999999985,"width":73,"staticCache":false,"skin":"assets/ui.Boss_BlueDragon/tick.png","scaleY":0.8,"scaleX":0.8,"right":0,"height":64,"bottom":10}},{"type":"Label","props":{"y":6,"x":72,"text":"第五天","name":"day","fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":40,"x":26,"text":"奖励","name":"reward ","fontSize":20,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":140,"x":66,"text":"武器点X1","name":"content","fontSize":20,"color":"#ffffff"}},{"type":"Image","props":{"y":62,"x":72,"skin":"assets/ui.battle/equipView2.png"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":560,"height":100},"child":[{"type":"Label","props":{"y":20,"x":40,"text":"黑龙巢穴","fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":40,"text":"挑战黑龙并获得宝藏","fontSize":20,"color":"#ffffff"}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10,"label":"label"}}]},{"type":"Box","props":{"y":675,"x":39,"width":476,"height":189},"child":[{"type":"Button","props":{"stateNum":"2","skin":"assets/ui.Boss_BlueDragon/button_enter_on.png","right":50,"label":"label","bottom":30},"child":[{"type":"Label","props":{"y":15,"x":45,"text":"挑战","fontSize":30,"color":"#ffffff"}}]},{"type":"Image","props":{"skin":"assets/ui.Boss_BlueDragon/boss.png","left":20,"bottom":10}},{"type":"Label","props":{"y":10,"x":150,"text":"黑龙美眉","fontSize":36,"color":"#ffffff","bold":true}}]}]};}
		]);
		return DailyBossDialogUI;
	})(Dialog);
var HeroDieDialogUI=(function(_super){
		function HeroDieDialogUI(){
			
		    this.heroIcon=null;
		    this.descLab=null;
		    this.titleNode=null;
		    this.infoTipsNode=null;
		    this.timeLab=null;
		    this.costNumLab=null;
		    this.btnRevive=null;
		    this.costLab=null;

			HeroDieDialogUI.__super.call(this);
		}

		CLASS$(HeroDieDialogUI,'ui.Dialogs.HeroDieDialogUI',_super);
		var __proto__=HeroDieDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HeroDieDialogUI.uiView);
		}

		STATICATTR$(HeroDieDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"text":"失去英雄援助之后，你获得的黄金和攻击力都大幅度减少！","mouseThrough":true,"mouseEnabled":true,"height":400,"fontSize":28},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","mouseEnabled":true,"height":781}},{"type":"Image","props":{"y":65.99999999999999,"x":300,"width":78,"var":"heroIcon","skin":"assets/icons/heros/1001.jpg","height":78,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":65.99999999999999,"x":300,"skin":"assets/ui.common/Frame_hero_grey.png","name":"Frame","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":370,"x":300,"width":520,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","name":"HeroMessage","height":350,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":248,"x":300,"wordWrap":true,"width":520,"var":"descLab","valign":"middle","text":"失去英雄援助之后，你获得的黄金和攻击力都大幅度减少！","leading":2,"height":86,"fontSize":22,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Sprite","props":{"y":140,"x":300,"var":"titleNode"}},{"type":"Sprite","props":{"y":310,"x":300,"var":"infoTipsNode"}},{"type":"Image","props":{"y":10,"x":10,"top":20,"skin":"assets/ui.common/image_close_black.png","right":20,"name":"close"}},{"type":"Label","props":{"y":582,"x":300,"wordWrap":true,"width":207,"valign":"middle","text":"英雄复活时间倒数：","leading":2,"height":28,"fontSize":20,"color":"#01bffb","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":583,"x":448,"wordWrap":true,"width":125,"var":"timeLab","valign":"middle","text":"99:99:99","leading":2,"height":28,"fontSize":20,"font":"SimHei","color":"#fb6500","anchorY":0.5,"anchorX":0.5,"align":"left"}},{"type":"Label","props":{"y":627,"x":300,"wordWrap":true,"width":580,"valign":"middle","text":"不立即复活，后面复活需要花费：","leading":2,"height":67,"fontSize":22,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":614,"x":457,"skin":"assets/ui.common/money_diamond_2.png"}},{"type":"Label","props":{"y":629,"x":557,"wordWrap":true,"width":125,"var":"costNumLab","valign":"middle","text":"1000","leading":2,"height":28,"fontSize":26,"font":"SimHei","color":"#f9f9f9","anchorY":0.5,"anchorX":0.5,"align":"left"}},{"type":"Button","props":{"y":692,"x":300,"var":"btnRevive","stateNum":"1","skin":"assets/ui.common/btn_heroDie.png","labelSize":20,"labelColors":"#ffffff","labelAlign":"center","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":33,"x":197,"wordWrap":true,"width":207,"valign":"middle","text":"立即复活！","leading":2,"height":28,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":-20.999999999999886,"x":-17.99999999999997,"skin":"assets/ui.common/image_label_50%off_cn.png"}},{"type":"Label","props":{"y":16,"x":382,"wordWrap":true,"width":125,"var":"costLab","valign":"middle","text":"1000","leading":2,"height":28,"fontSize":26,"font":"SimHei","color":"#f9f9f9","anchorY":0.5,"anchorX":0.5,"align":"left"}},{"type":"Image","props":{"y":2,"x":281,"skin":"assets/ui.common/money_diamond_2.png"}}]}]};}
		]);
		return HeroDieDialogUI;
	})(Dialog);
var HeroSkillDialogUI=(function(_super){
		function HeroSkillDialogUI(){
			
		    this.descLab=null;
		    this.heroIcon=null;
		    this.nameLab=null;
		    this.levelLab=null;
		    this.dpsLab=null;
		    this.nowStarLab=null;
		    this.nextStarLab=null;
		    this.skillBox0=null;
		    this.skillBox1=null;
		    this.skillBox2=null;
		    this.skillBox3=null;
		    this.skillBox4=null;
		    this.skillBox5=null;
		    this.skillBox6=null;
		    this.skillBox7=null;

			HeroSkillDialogUI.__super.call(this);
		}

		CLASS$(HeroSkillDialogUI,'ui.Dialogs.HeroSkillDialogUI',_super);
		var __proto__=HeroSkillDialogUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HeroSkillDialogUI.uiView);
		}

		STATICATTR$(HeroSkillDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"mouseThrough":true,"mouseEnabled":true,"height":890,"color":"#06b1f4"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","mouseEnabled":true,"height":890}},{"type":"Image","props":{"y":300,"x":10,"width":580,"skin":"assets/ui.common/bg_banner.png","sizeGrid":"5,5,5,5","height":150}},{"type":"Image","props":{"y":445,"x":10,"width":580,"skin":"assets/ui.common/bg_banner.png","sizeGrid":"5,5,5,5","height":145}},{"type":"Image","props":{"y":585,"x":10,"width":580,"skin":"assets/ui.common/bg_banner.png","sizeGrid":"5,5,5,5","height":150}},{"type":"Image","props":{"y":730,"x":10,"width":580,"skin":"assets/ui.common/bg_banner.png","sizeGrid":"5,5,5,5","height":150}},{"type":"Image","props":{"y":200,"width":560,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","right":20,"name":"HeroMessage","height":100}},{"type":"Label","props":{"y":210,"x":27,"wordWrap":true,"width":548,"var":"descLab","leading":2,"height":86,"fontSize":20,"color":"#ffffff"}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"HeroDetails","height":190},"child":[{"type":"Image","props":{"y":70,"x":20,"width":78,"var":"heroIcon","skin":"assets/icons/heros/1001.jpg","height":78}},{"type":"Image","props":{"y":70,"x":20,"skin":"assets/ui.common/Frame_hero_grey.png","name":"Frame"}},{"type":"Label","props":{"y":20,"x":20,"var":"nameLab","text":"英雄名字七个字","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"skin":"assets/ui.common/button_reborn_blue.png","scaleY":0.7,"scaleX":0.7,"right":15,"name":"Upgrade","label":"升星","bottom":10},"child":[{"type":"Label","props":{"x":56,"top":12,"text":"升星","fontSize":36,"color":"#ffffff"}}]},{"type":"Label","props":{"y":72,"x":129,"width":67,"text":"Lv.","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":72,"x":269,"width":83,"text":"DPS：","height":20,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":72,"x":188,"width":67,"var":"levelLab","text":"99","height":20,"fontSize":20,"color":"#06e1f4"}},{"type":"Label","props":{"y":72,"x":344,"width":183,"var":"dpsLab","text":"100000","height":20,"fontSize":20,"color":"#f46e06"}},{"type":"Label","props":{"y":122,"x":124,"width":134,"text":"当前星级效果：    \\n下一星级效果：","height":45,"fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":121,"x":261,"width":183,"var":"nowStarLab","text":"无加成","height":20,"fontSize":20,"color":"#f4a706"}},{"type":"Label","props":{"y":143,"x":261,"width":183,"var":"nextStarLab","text":"基础伤害x2","height":20,"fontSize":20,"color":"#f4a706"}}]},{"type":"Box","props":{"y":305,"x":20,"width":560,"var":"skillBox0","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":377,"x":20,"width":560,"var":"skillBox1","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":449,"x":20,"width":560,"var":"skillBox2","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":521,"x":20,"width":560,"var":"skillBox3","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":594,"x":20,"width":560,"var":"skillBox4","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":666,"x":20,"width":560,"var":"skillBox5","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":738,"x":20,"width":560,"var":"skillBox6","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Box","props":{"y":810,"x":20,"width":560,"var":"skillBox7","scaleY":0.8,"scaleX":0.8,"name":"Lv.N_Skill","height":80},"child":[{"type":"Image","props":{"y":0,"x":10,"width":78,"skin":"assets/icons/heros/1001.jpg","name":"icon","height":78}},{"type":"Image","props":{"x":10,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":2,"x":100,"width":155,"text":"技能名","name":"nameLab","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Text","props":{"y":30,"x":100,"wordWrap":true,"width":426,"valign":"middle","text":"体重增加200%。 我是胖子我是胖子我是胖子压死你","name":"descLab","height":42,"fontSize":"17","color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":62,"x":7,"text":"等级：","name":"Lv","fontSize":15,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":42,"width":46,"text":"10","name":"levelLab","height":20,"fontSize":19,"color":"#06b1f4","align":"left"}}]},{"type":"Button","props":{"y":21.999999999999986,"x":516.9999999999999,"stateNum":3,"skin":"assets/ui.common/button_close.png","name":"close","anchorY":0,"anchorX":0}}]};}
		]);
		return HeroSkillDialogUI;
	})(Dialog);
var MatchUI=(function(_super){
		function MatchUI(){
			

			MatchUI.__super.call(this);
		}

		CLASS$(MatchUI,'ui.Dialogs.MatchUI',_super);
		var __proto__=MatchUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MatchUI.uiView);
		}

		STATICATTR$(MatchUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":900},"child":[{"type":"Image","props":{"y":10,"x":10,"width":580,"skin":"assets/ui.Boss_BlueDragon/bg_match.png","height":436}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":142},"child":[{"type":"Label","props":{"y":10,"x":10,"text":"比赛","fontSize":40,"color":"#fba453","bold":true}},{"type":"TextArea","props":{"y":80,"x":20,"width":540,"text":"你将面对200名同样强大的团队挑战，打败他们获取传说中的宝藏！比赛每周三和周六开战，切勿错过！","height":55,"fontSize":22,"color":"#fba453"}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10,"label":"label"}}]},{"type":"Box","props":{"y":149.99999999999997,"x":9.999999999999998,"width":580,"name":"Main","height":740},"child":[{"type":"TextArea","props":{"y":20,"x":20,"width":540,"text":"参加比赛需要进化主角，进化后的24小时内，冲击自己关卡的最高纪录！24小时内或者24小时内的第一次转生成绩将会是你比赛结果。","height":81,"fontSize":24,"color":"#ff4408","bold":false}},{"type":"Button","props":{"y":610,"x":366,"width":150,"skin":"assets/ui.common/button_match_confirm.png","label":"label","height":60},"child":[{"type":"Label","props":{"y":10,"x":33,"text":"开 始","fontSize":36,"color":"#ffffff"}}]},{"type":"Image","props":{"skin":"assets/banners/TankMatch.png","right":0,"bottom":130}},{"type":"Label","props":{"text":"离结束报名还剩00:00:00","right":30,"fontSize":20,"color":"#ffffff","bottom":20}}]},{"type":"Image","props":{"y":320,"x":20,"width":280,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":500},"child":[{"type":"Image","props":{"y":20,"x":20,"width":240,"top":20,"skin":"assets/ui.common/bg_darkgrey.png","name":"No.1","height":150},"child":[{"type":"Label","props":{"y":4,"x":20,"text":"第1名","name":"No.","fontSize":24,"color":"#ffffff"}},{"type":"Image","props":{"y":38,"x":6,"skin":"assets/ui.common/money_diamond_2.png","name":"diamond"}},{"type":"Image","props":{"y":73,"x":9.5,"width":30,"skin":"assets/ui.common/equipView2.png","name":"EQUIpoint","height":30}},{"type":"Image","props":{"y":110,"x":9.5,"width":30,"skin":"assets/ui.common/money_matchpoint.png","name":"matchpoint","height":30}},{"type":"Label","props":{"y":40,"x":60,"text":"1000钻石","name":"1000diamond","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":77,"x":60,"text":"15武器点","name":"15equippoint","fontSize":22,"color":"#fffff"}},{"type":"Label","props":{"y":114,"x":60,"text":"100赛点","name":"matchpoint","fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"skin":"assets/ui.match/image_crown_1.png","right":10,"name":"Crown","bottom":40}}]},{"type":"Image","props":{"y":175,"x":20,"width":240,"skin":"assets/ui.common/bg_darkgrey.png","name":"No.2","height":150},"child":[{"type":"Label","props":{"y":4,"x":20,"text":"第2名","name":"No.","fontSize":24,"color":"#ffffff"}},{"type":"Image","props":{"y":38,"x":6,"skin":"assets/ui.common/money_diamond_2.png","name":"diamond"}},{"type":"Image","props":{"y":73,"x":9.5,"width":30,"skin":"assets/ui.common/equipView2.png","name":"EQUIpoint","height":30}},{"type":"Image","props":{"y":110,"x":9.5,"width":30,"skin":"assets/ui.common/money_matchpoint.png","name":"matchpoint","height":30}},{"type":"Label","props":{"y":40,"x":60,"text":"500钻石","name":"1000diamond","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":77,"x":60,"text":"12武器点","name":"15equippoint","fontSize":22,"color":"#fffff"}},{"type":"Label","props":{"y":114,"x":60,"text":"80赛点","name":"matchpoint","fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"skin":"assets/ui.match/image_crown_2.png","right":10,"bottom":40}}]},{"type":"Image","props":{"y":330,"x":20,"width":240,"skin":"assets/ui.common/bg_darkgrey.png","name":"No.3","height":150},"child":[{"type":"Label","props":{"y":4,"x":20,"text":"第3名","name":"No.","fontSize":24,"color":"#ffffff"}},{"type":"Image","props":{"y":38,"x":6,"skin":"assets/ui.common/money_diamond_2.png","name":"diamond"}},{"type":"Image","props":{"y":73,"x":9.5,"width":30,"skin":"assets/ui.common/equipView2.png","name":"EQUIpoint","height":30}},{"type":"Image","props":{"y":110,"x":9.5,"width":30,"skin":"assets/ui.common/money_matchpoint.png","name":"matchpoint","height":30}},{"type":"Label","props":{"y":40,"x":60,"text":"350钻石","name":"1000diamond","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":77,"x":60,"text":"10武器点","name":"15equippoint","fontSize":22,"color":"#fffff"}},{"type":"Label","props":{"y":114,"x":60,"text":"60赛点","name":"matchpoint","fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"skin":"assets/ui.match/image_crown_3.png","right":10,"bottom":40}}]},{"type":"Button","props":{"y":506,"x":38,"width":200,"skin":"assets/ui.common/button_match_gift.png","label":"label","height":50},"child":[{"type":"Label","props":{"text":"奖品列表","right":14,"fontSize":30,"color":"#ffffff","bottom":12,"bold":false}},{"type":"Image","props":{"x":4,"skin":"assets/ui.match/image_crown_1.png"}}]}]}]};}
		]);
		return MatchUI;
	})(Dialog);
var MatchDialogRewardUI=(function(_super){
		function MatchDialogRewardUI(){
			

			MatchDialogRewardUI.__super.call(this);
		}

		CLASS$(MatchDialogRewardUI,'ui.Dialogs.MatchDialogRewardUI',_super);
		var __proto__=MatchDialogRewardUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MatchDialogRewardUI.uiView);
		}

		STATICATTR$(MatchDialogRewardUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":900},"child":[{"type":"Image","props":{"y":84,"x":40,"width":520,"skin":"assets/ui.common/Frame_hero_grey.png","sizeGrid":"10,20,10,10","name":"range","height":720}},{"type":"Image","props":{"y":10,"x":10,"width":580,"skin":"assets/ui.Boss_BlueDragon/bg_match.png","name":"bg","height":313}},{"type":"Image","props":{"y":90,"x":45,"width":510,"skin":"assets/ui.common/bg_darkgrey.png","height":709,"alpha":0.5}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":78},"child":[{"type":"Label","props":{"y":10,"x":29,"text":"比赛结果","fontSize":40,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":30,"x":212,"text":"您刚刚完成了比赛。","fontSize":20,"color":"#ffffff"}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10,"label":"label"}}]},{"type":"Box","props":{"y":91,"x":45,"width":510,"pivotY":-4,"height":703},"child":[{"type":"Label","props":{"y":4,"x":20,"text":"排行榜","name":"Charts","fontSize":30,"color":"#ffffff","bold":true}},{"type":"Label","props":{"top":10,"text":"00：00：00 开始发奖","right":20,"name":"Time","fontSize":22,"color":"#fffff","bold":false}},{"type":"Label","props":{"y":320,"x":231,"text":". . .","name":"......","fontSize":30,"color":"#ffffff","bold":true}},{"type":"Box","props":{"width":280,"right":0,"height":180,"bottom":20},"child":[{"type":"Label","props":{"y":10,"x":5,"text":"第XX名","fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":44,"x":5,"text":"最高关卡：9999","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":74,"x":5,"text":"奖品：","fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"y":75,"x":73,"skin":"assets/ui.common/money_diamond_2.png","scaleY":0.8,"scaleX":0.8,"name":"diamond"}},{"type":"Image","props":{"y":146,"x":75,"width":24,"skin":"assets/ui.common/money_matchpoint.png","scaleY":1.2,"scaleX":1.2,"name":"matchpoint","height":24}},{"type":"Image","props":{"y":106,"x":74,"width":30,"skin":"assets/ui.common/equipView2.png","name":"epuip","height":30}},{"type":"Label","props":{"y":76,"x":130,"text":"9999钻石","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":114,"x":130,"text":"99武器点","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":150,"x":130,"text":"99赛点","fontSize":20,"color":"#ffffff"}}]},{"type":"Box","props":{"y":55,"x":15,"width":480,"name":"No.1","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":100,"x":15,"width":480,"name":"No.2","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":145,"x":15,"width":480,"name":"No.3","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":190,"x":15,"width":480,"name":"No.4","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":235,"x":15,"width":480,"name":"No.5","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":280,"x":15,"width":480,"name":"No.6","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":360,"x":15,"width":480,"name":"front","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":405,"x":15,"width":480,"name":"me","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]},{"type":"Box","props":{"y":450,"x":15,"width":480,"name":"behind","height":32},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"assets/ui.common/white32x32.png","name":"No.1","height":32,"alpha":0.2}},{"type":"Label","props":{"x":20,"text":"1.","name":"No.","fontSize":26,"color":"#ffffff","bottom":4,"bold":true}},{"type":"Image","props":{"x":70,"width":26,"skin":"assets/icons/locations/11.png","name":"Location","height":26,"bottom":3}},{"type":"Label","props":{"x":120,"text":"NAMExxx","name":"Name","fontSize":24,"color":"#ffffff","bottom":4}},{"type":"Image","props":{"width":30,"skin":"assets/icons/stages/1-1.png","right":20,"name":"Map","height":30},"child":[{"type":"Image","props":{"width":30,"skin":"assets/ui.common/bg_stage.png","height":30}}]},{"type":"Label","props":{"text":"第9999关","right":70,"name":"Stage","fontSize":20,"color":"#ffffff","bottom":4}}]}]},{"type":"Button","props":{"y":812,"x":303,"skin":"assets/ui.common/button_blue_big.png","scaleY":0.8,"scaleX":0.9,"label":"label"},"child":[{"type":"Label","props":{"y":19,"x":32,"text":"领取奖励","fontSize":40,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"skin":"assets/banners/TankMatch.png","scaleY":0.7,"scaleX":0.7,"left":60,"bottom":10}}]};}
		]);
		return MatchDialogRewardUI;
	})(Dialog);
var MessageDialogUI=(function(_super){
		function MessageDialogUI(){
			
		    this.background=null;
		    this.backgroudArea=null;
		    this.backgroudType=null;
		    this.textSubject=null;
		    this.textContent=null;
		    this.btnConfirm=null;

			MessageDialogUI.__super.call(this);
		}

		CLASS$(MessageDialogUI,'ui.Dialogs.MessageDialogUI',_super);
		var __proto__=MessageDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MessageDialogUI.uiView);
		}

		STATICATTR$(MessageDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"width":600,"var":"background","skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":400}},{"type":"Image","props":{"y":100,"x":10,"width":580,"var":"backgroudArea","skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"5,0,0,0","height":150}},{"type":"Image","props":{"y":251,"x":20,"var":"backgroudType","skin":"assets/banners/banner_boss.png","left":20,"bottom":0}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":90},"child":[{"type":"Label","props":{"y":40,"x":10,"width":300,"var":"textSubject","valign":"middle","text":"提示标题","height":40,"fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0,"align":"left"}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10,"name":"close"}}]},{"type":"TextArea","props":{"y":110,"x":20,"width":560,"var":"textContent","text":"无法在规定时间内击败魔王。请先把自己变强吧！","height":130,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"var":"btnConfirm","skin":"assets/ui.common/button_reborn_blue.png","right":40,"name":"sure","labelSize":40,"labelColors":"#ffffff","label":"确定","bottom":50}}]};}
		]);
		return MessageDialogUI;
	})(Dialog);
var NetStatusDialogUI=(function(_super){
		function NetStatusDialogUI(){
			
		    this.animation=null;
		    this.message=null;

			NetStatusDialogUI.__super.call(this);
		}

		CLASS$(NetStatusDialogUI,'ui.Dialogs.NetStatusDialogUI',_super);
		var __proto__=NetStatusDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(NetStatusDialogUI.uiView);
		}

		STATICATTR$(NetStatusDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":640,"height":1136},"child":[{"type":"Animation","props":{"y":470,"x":272,"var":"animation","autoPlay":true}},{"type":"Label","props":{"y":576,"x":182,"width":300,"var":"message","valign":"middle","text":"正在连接...","height":40,"fontSize":38,"color":"#ffffff","align":"center"}}]};}
		]);
		return NetStatusDialogUI;
	})(Dialog);
var RebornDialogUI=(function(_super){
		function RebornDialogUI(){
			

			RebornDialogUI.__super.call(this);
		}

		CLASS$(RebornDialogUI,'ui.Dialogs.RebornDialogUI',_super);
		var __proto__=RebornDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RebornDialogUI.uiView);
		}

		STATICATTR$(RebornDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":600},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":600},"child":[{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":80},"child":[{"type":"Label","props":{"x":20,"text":"进化","fontSize":40,"color":"#ffffff","bottom":20}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10,"label":"label"}}]}]},{"type":"Box","props":{"y":100,"x":10,"width":580,"height":490},"child":[{"type":"Image","props":{"y":0,"x":20,"skin":"assets/ui.common/Frame_hero_grey.png"}},{"type":"Image","props":{"y":3,"x":23,"width":70,"skin":"assets/icons/skills/square/100107.jpg","height":70}},{"type":"TextArea","props":{"y":0,"x":110,"width":460,"text":"退回到进入世界的初始状态。给你带来大量珍贵的荣誉，用以购买和升级神器。重新开始的世界，你会发现自己是如此强大！","height":80,"fontSize":24,"color":"#ffffff"}},{"type":"Box","props":{"y":90,"x":10,"width":560,"height":60},"child":[{"type":"Label","props":{"y":4,"x":10,"text":"你将继承：","name":"Title","fontSize":16,"color":"#fd3e01","bold":true}},{"type":"Label","props":{"y":36,"x":150,"width":32.625,"text":"神器","name":"Artifact","height":16,"fontSize":16,"color":"#fd3e01","bold":true}},{"type":"Label","props":{"y":36,"x":260,"text":"武器","name":"Epuip","fontSize":16,"color":"#fd3e01","bold":true}},{"type":"Image","props":{"y":24,"x":99,"width":40,"skin":"assets/ui.common/artifactView_round.png","name":"artifact","height":40}},{"type":"Image","props":{"y":24,"x":208,"width":40,"skin":"assets/ui.common/equipView2.png","name":"equip","height":40}}]},{"type":"Box","props":{"y":160,"x":20,"width":540,"height":250},"child":[{"type":"Image","props":{"y":0,"x":0,"width":540,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":250,"alpha":0.8}},{"type":"Label","props":{"y":20,"text":"英雄等级额外奖励：","right":300,"name":"T1","fontSize":16,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":50,"text":"过关奖励：","right":300,"name":"T2","fontSize":16,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":80,"text":"无英雄死亡：","right":300,"name":"T3","fontSize":16,"color":"#ffffff"}},{"type":"Label","props":{"y":110,"text":"泰兰德的回忆奖励：","right":300,"name":"T4","fontSize":16,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":140,"text":"荣誉之戒奖励（+30%）：","right":300,"name":"T5","fontSize":16,"color":"#ffffff","bold":false}},{"type":"Label","props":{"y":170,"text":"越级弹簧：","right":300,"name":"T6","fontSize":16,"color":"#ffffff"}},{"type":"Label","props":{"y":210,"text":"总奖励：","right":300,"name":"TT","fontSize":16,"color":"#ffffff"}},{"type":"Image","props":{"y":15,"x":392.79999999999995,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"right":120}},{"type":"Image","props":{"y":45,"x":392.79999999999995,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"right":120}},{"type":"Image","props":{"y":75,"x":392.79999999999995,"staticCache":false,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"right":120}},{"type":"Image","props":{"y":105,"x":392.79999999999995,"staticCache":false,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"right":120}},{"type":"Image","props":{"y":135,"x":392.79999999999995,"staticCache":false,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"right":120}},{"type":"Image","props":{"y":205,"x":392.79999999999995,"skin":"assets/ui.common/money_artifactIcon_2.png","scaleY":0.8,"scaleX":0.8,"right":120}},{"type":"Label","props":{"y":20,"text":"9999999999","right":150,"name":"TM1","fontSize":16,"color":"#ffffff"}},{"type":"Label","props":{"y":50,"x":10,"text":"9999999999","right":150,"name":"TM2","fontSize":16,"color":"#ffffff"}},{"type":"Label","props":{"y":80,"text":"9999999999","right":150,"name":"TM3","fontSize":16,"color":"#fd3e01"}},{"type":"Label","props":{"y":110,"x":20,"text":"9999999999","right":150,"name":"TM4","fontSize":16,"color":"#fd3e01"}},{"type":"Label","props":{"y":140,"x":30,"text":"9999999999","right":150,"name":"TM5","fontSize":16,"color":"#fd3e01"}},{"type":"Label","props":{"y":170,"x":40,"text":"初始关卡1000","right":150,"name":"TM6","fontSize":16,"color":"#fd3e01"}},{"type":"Label","props":{"y":210,"x":50,"text":"9999999999","right":150,"name":"TMT","fontSize":16,"color":"#ffffff"}}]},{"type":"Button","props":{"x":200,"skin":"assets/ui.common/button_reborn_blue.png","scaleY":0.9,"scaleX":0.9,"label":"进化","bottom":8},"child":[{"type":"Label","props":{"x":54,"top":12,"text":"进化","fontSize":36,"color":"#ffffff"}}]}]}]};}
		]);
		return RebornDialogUI;
	})(Dialog);
var RewardDialogUI=(function(_super){
		function RewardDialogUI(){
			
		    this.effectSprite=null;
		    this.rewardIcon=null;
		    this.rewardText=null;

			RewardDialogUI.__super.call(this);
		}

		CLASS$(RewardDialogUI,'ui.Dialogs.RewardDialogUI',_super);
		var __proto__=RewardDialogUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RewardDialogUI.uiView);
		}

		STATICATTR$(RewardDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":640,"mouseThrough":true,"mouseEnabled":true,"height":1136},"child":[{"type":"Sprite","props":{"y":568,"x":320,"var":"effectSprite"}},{"type":"Image","props":{"y":410,"x":320,"var":"rewardIcon","skin":"assets/ui.common/artifactView.png","anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":522,"x":248,"var":"rewardText","text":"金币 X 1000","fontSize":"30","font":"Arial","align":"center"}}]};}
		]);
		return RewardDialogUI;
	})(Dialog);
var SelectServerDialogUI=(function(_super){
		function SelectServerDialogUI(){
			
		    this.backgroud=null;
		    this.boxServers=null;

			SelectServerDialogUI.__super.call(this);
		}

		CLASS$(SelectServerDialogUI,'ui.Dialogs.SelectServerDialogUI',_super);
		var __proto__=SelectServerDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SelectServerDialogUI.uiView);
		}

		STATICATTR$(SelectServerDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"mouseThrough":true,"mouseEnabled":true,"height":400,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"var":"backgroud","skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":400},"child":[{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"5,0,0,0","height":290}}]},{"type":"Box","props":{"y":50,"x":300,"width":580,"name":"Top","height":90,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"请选择服务器","fontSize":40,"color":"#ffffff"}},{"type":"Button","props":{"y":12,"x":507,"stateNum":3,"skin":"assets/ui.common/button_close.png","name":"close","anchorY":0,"anchorX":0}}]},{"type":"Box","props":{"y":120,"x":20,"width":560,"var":"boxServers","height":260}}]};}
		]);
		return SelectServerDialogUI;
	})(Dialog);
var ShopDialogUI=(function(_super){
		function ShopDialogUI(){
			

			ShopDialogUI.__super.call(this);
		}

		CLASS$(ShopDialogUI,'ui.Dialogs.ShopDialogUI',_super);
		var __proto__=ShopDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ShopDialogUI.uiView);
		}

		STATICATTR$(ShopDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":800},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":800}},{"type":"Image","props":{"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":600,"bottom":12}},{"type":"Box","props":{"y":0,"x":0,"width":600,"name":"ShopBanner","height":200},"child":[{"type":"Image","props":{"y":130,"x":13.000000000000114,"staticCache":false,"skin":"assets/ui.common/Icon_inshop2_off.png","scaleY":0.8,"name":"ShopOff"}},{"type":"Image","props":{"y":130,"x":409,"skin":"assets/ui.common/Icon_inshop1_on.png","scaleY":0.8,"name":"ShopOn"}},{"type":"Image","props":{"y":130,"x":211.00000000000006,"skin":"assets/ui.common/Icon_inshop1_on.png","scaleY":0.8,"name":"ShopOn"}},{"type":"Image","props":{"y":130,"x":13.000000000000114,"skin":"assets/ui.common/Icon_inshop1_on.png","scaleY":0.8,"name":"ShopOn"}},{"type":"Image","props":{"y":130,"x":211.00000000000006,"skin":"assets/ui.common/Icon_inshop2_off.png","scaleY":0.8,"name":"ShopOff"}},{"type":"Image","props":{"y":130,"x":409,"width":178,"skin":"assets/ui.common/Icon_inshop2_off.png","scaleY":0.8,"right":13,"name":"ShopOff","height":77}},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"label"}},{"type":"Label","props":{"y":50,"x":30,"text":"商城","fontSize":40,"color":"#ffffff"}},{"type":"Image","props":{"y":82,"x":163,"skin":"assets/ui.common/e_0007_圆角矩形-5.png","scaleY":0.7,"scaleX":0.5}},{"type":"Image","props":{"y":82,"x":143,"skin":"assets/ui.common/money_diamond_2.png"}},{"type":"Button","props":{"y":82,"x":263,"skin":"assets/ui.common/button_plus.png","scaleY":0.6,"scaleX":0.6,"label":"label"}},{"type":"Image","props":{"y":82,"x":343,"skin":"assets/ui.common/e_0007_圆角矩形-5.png","scaleY":0.7,"scaleX":0.5}},{"type":"Image","props":{"y":81,"x":333,"skin":"assets/ui.common/money_artifactIcon_2.png"}},{"type":"Button","props":{"y":82,"x":443,"skin":"assets/ui.common/button_plus.png","scaleY":0.6,"scaleX":0.6,"label":"label"}},{"type":"Image","props":{"y":30,"x":160,"skin":"assets/ui.common/e_0007_圆角矩形-5.png","scaleY":0.7,"scaleX":0.5}},{"type":"Image","props":{"y":30,"x":145,"skin":"assets/ui.common/money_tencent.png"}},{"type":"Button","props":{"y":30,"x":263,"skin":"assets/ui.common/button_plus.png","scaleY":0.6,"scaleX":0.6,"label":"label"}}]},{"type":"Box","props":{"y":190,"x":10,"width":580,"name":"Goods","height":600}}]};}
		]);
		return ShopDialogUI;
	})(Dialog);
var SystemCloudUI=(function(_super){
		function SystemCloudUI(){
			

			SystemCloudUI.__super.call(this);
		}

		CLASS$(SystemCloudUI,'ui.Dialogs.SystemCloudUI',_super);
		var __proto__=SystemCloudUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SystemCloudUI.uiView);
		}

		STATICATTR$(SystemCloudUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":300},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":300}},{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":150}},{"type":"Image","props":{"y":130,"x":120,"skin":"assets/icons/system/image_CloudSave_download.png","scaleY":1.2,"scaleX":1.2}},{"type":"Image","props":{"y":130,"skin":"assets/icons/system/image_CloudSave_upload.png","scaleY":1.2,"scaleX":1.2,"right":130}},{"type":"Label","props":{"y":199,"x":110,"text":"从云端下载","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"y":199,"x":390,"text":"提交到云端","fontSize":20,"color":"#ffffff"}},{"type":"Label","props":{"x":114,"text":"最近一次存档时间：2016-12-20   23：59：59","fontSize":18,"color":"#ffffff","bottom":20}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":90},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"游戏云端存储","fontSize":36,"color":"#ffffff"}},{"type":"Button","props":{"y":10,"skin":"assets/ui.common/button_close.png","right":10,"label":"label"}}]}]};}
		]);
		return SystemCloudUI;
	})(Dialog);
var SystemDialogUI=(function(_super){
		function SystemDialogUI(){
			

			SystemDialogUI.__super.call(this);
		}

		CLASS$(SystemDialogUI,'ui.Dialogs.SystemDialogUI',_super);
		var __proto__=SystemDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SystemDialogUI.uiView);
		}

		STATICATTR$(SystemDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":600,"fontSize":40},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":620}},{"type":"Image","props":{"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","right":10,"height":450,"bottom":60}},{"type":"Label","props":{"y":30,"x":30,"text":"设 置","fontSize":"40","color":"#ffffff"}},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"label"}},{"type":"Box","props":{"y":100,"x":10,"width":580,"name":"SYSTEM","height":430},"child":[{"type":"Image","props":{"y":18.5,"x":324,"skin":"assets/icons/system/image_Statistics.png"},"child":[{"type":"Label","props":{"y":74,"x":10,"width":60,"text":"统计","height":35,"fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":18,"x":179,"skin":"assets/icons/system/image_music.png"},"child":[{"type":"Label","props":{"y":74,"x":10,"width":60,"text":"音效","height":35,"fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":20.5,"x":50,"skin":"assets/icons/system/image_Sound.png"},"child":[{"type":"Label","props":{"y":70,"x":3,"width":60,"text":"音乐","height":35,"fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":25.5,"x":472,"skin":"assets/icons/system/image_CloudSave.png","right":50},"child":[{"type":"Label","props":{"y":70,"width":70,"text":"云存储","height":35,"fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":180,"skin":"assets/icons/system/image_Comfirm_on.png","left":50},"child":[{"type":"Label","props":{"y":70,"x":-37,"text":"消费确认（开）","fontSize":20,"color":"#ffffff"}}]},{"type":"Image","props":{"y":180,"x":50,"skin":"assets/icons/system/image_Comfirm_off.png","left":50},"child":[{"type":"Label","props":{"y":70,"x":-49,"text":"消费确认（关）","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":180,"x":187,"skin":"assets/icons/system/image_ChangeAccount.png"},"child":[{"type":"Label","props":{"y":70,"x":-15,"text":"账号切换","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":180,"x":325,"skin":"assets/icons/system/image_Gift.png"},"child":[{"type":"Label","props":{"y":70,"x":-12,"text":"礼品兑换","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":180,"x":474,"skin":"assets/icons/system/image_Broadcast.png","right":50},"child":[{"type":"Label","props":{"y":70,"x":5,"text":"公告","fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":320,"x":50,"skin":"assets/icons/system/image_Proformance_Low.png","left":50},"child":[{"type":"Label","props":{"y":70,"x":-10,"text":"低性能","fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":320,"skin":"assets/icons/system/image_Proformance_High.png","left":50},"child":[{"type":"Label","props":{"y":70,"x":-10,"text":"高性能","fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":320,"x":190,"skin":"assets/icons/system/image_TankMessage.png"},"child":[{"type":"Label","props":{"y":70,"x":5,"text":"名片","fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"y":320,"x":340,"skin":"assets/icons/system/image_MoreGames.png"},"child":[{"type":"Label","props":{"y":70,"x":-15,"text":"更多游戏","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":320,"x":478,"skin":"assets/icons/system/image_Quit.png","right":50},"child":[{"type":"Label","props":{"y":70,"text":"退出","fontSize":24,"color":"#ffffff"}}]}]},{"type":"Label","props":{"text":"官方Q群：511351339    加群免费礼包大派送","left":20,"fontSize":18,"color":"#ffffff","bottom":30}},{"type":"Label","props":{"text":"版本号：1.0.10.7501","left":20,"fontSize":18,"color":"#ffffff","bottom":0}}]};}
		]);
		return SystemDialogUI;
	})(Dialog);
var SystemStatisticsTipsUI=(function(_super){
		function SystemStatisticsTipsUI(){
			

			SystemStatisticsTipsUI.__super.call(this);
		}

		CLASS$(SystemStatisticsTipsUI,'ui.Dialogs.SystemStatisticsTipsUI',_super);
		var __proto__=SystemStatisticsTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SystemStatisticsTipsUI.uiView);
		}

		STATICATTR$(SystemStatisticsTipsUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":800},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":800}},{"type":"Image","props":{"y":176,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":614},"child":[{"type":"Box","props":{"y":18,"x":20,"width":540,"name":"Statistics","height":630},"child":[{"type":"Label","props":{"y":0,"x":0,"text":"当前","name":"Now","fontSize":30,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":50,"x":40,"text":"英雄等级总和","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":90,"x":40,"text":"暴击率","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":130,"x":40,"text":"暴击伤害","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":170,"x":40,"text":"距离上次进化时间","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":50,"x":300,"text":"9999","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":90,"x":300,"text":"9999%","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":130,"x":300,"text":"9999ll","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":170,"x":300,"text":"999:59:59","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":216,"x":0,"text":"总计（进化不清零）","name":"Whole","fontSize":30,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":260,"x":40,"text":"获得总金币","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":300,"x":40,"text":"点击屏幕次数","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":340,"x":40,"text":"杀死怪物数量","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":380,"x":40,"text":"点击魅魔次数","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":420,"x":40,"text":"最高到达关卡","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":460,"x":40,"text":"进化次数","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":500,"x":40,"text":"游戏在线总时长","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":540,"x":40,"text":"获得总金币","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":260,"x":300,"text":"999.99PP","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":300,"x":300,"text":"999.99K","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":340,"x":300,"text":"999.99K","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":380,"x":300,"text":"9999.99K","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":420,"x":300,"text":"3333","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":460,"x":300,"text":"3333","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":500,"x":300,"text":"99954：59：59","fontSize":24,"color":"#ff4408","bold":true}},{"type":"Label","props":{"y":540,"x":300,"text":"9999天","fontSize":24,"color":"#ff4408","bold":true}}]}]},{"type":"Box","props":{"y":10,"x":10,"width":580,"height":160},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"战绩","fontSize":40,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":20,"text":"您的光辉历史都在这里陈列","fontSize":28,"color":"#ffffff"}},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"label"}},{"type":"Button","props":{"y":114,"x":20,"width":200,"skin":"assets/ui.common/button_reborn_blue.png","label":"label","height":40},"child":[{"type":"Label","props":{"y":8,"x":30,"text":"分享到朋友圈","fontSize":22,"color":"#ffffff","bold":true}}]}]}]};}
		]);
		return SystemStatisticsTipsUI;
	})(Dialog);
var TankDialogUI=(function(_super){
		function TankDialogUI(){
			
		    this.changeName=null;
		    this.changeProvince=null;
		    this.nameLabel=null;
		    this.provinceLabel=null;
		    this.levelLabel=null;
		    this.damageLabel=null;
		    this.locationImage=null;

			TankDialogUI.__super.call(this);
		}

		CLASS$(TankDialogUI,'ui.Dialogs.TankDialogUI',_super);
		var __proto__=TankDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TankDialogUI.uiView);
		}

		STATICATTR$(TankDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":800},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":800}},{"type":"Image","props":{"y":180,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":610}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"top","height":150},"child":[{"type":"Image","props":{"y":20,"x":20,"width":78,"skin":"assets/ui.message/10001.png","height":78}},{"type":"Image","props":{"y":20,"x":20,"skin":"assets/ui.common/Frame_hero_grey.png"}},{"type":"Image","props":{"y":20,"x":300,"var":"changeName","skin":"assets/ui.common/image_pen.png"}},{"type":"Image","props":{"y":70,"x":250,"var":"changeProvince","skin":"assets/ui.common/image_pen.png"}},{"type":"Label","props":{"y":20,"x":110,"var":"nameLabel","text":"兔爷是我七个字","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":110,"var":"provinceLabel","text":"广东省","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"x":110,"text":"等级：","fontSize":18,"color":"#ffffff","bottom":10}},{"type":"Label","props":{"x":250,"text":"攻击力：","fontSize":18,"color":"#ffffff","bottom":10}},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"name":"close","label":"label"}},{"type":"Label","props":{"x":160,"var":"levelLabel","text":"3500","fontSize":18,"color":"#03f9dc","bottom":10}},{"type":"Label","props":{"x":320,"var":"damageLabel","text":"999.99BB","fontSize":18,"color":"#fd3e01","bottom":10,"bold":true}},{"type":"Image","props":{"y":66,"x":194,"var":"locationImage","skin":"assets/icons/locations/11.png"}}]},{"type":"Box","props":{"width":580,"name":"Upgrade","left":10,"height":600,"bottom":5},"child":[{"type":"Image","props":{"y":230,"x":50,"skin":"assets/ui.message/e_0001_图层-56-拷贝.png"},"child":[{"type":"Image","props":{"y":130,"x":180,"skin":"assets/ui.message/z_0001_%.png"}},{"type":"Image","props":{"y":15.999999999999886,"x":-29.000000000000064,"skin":"assets/ui.message/e_0011_组-1.png"},"child":[{"type":"Image","props":{"y":6,"x":60,"skin":"assets/ui.message/z_0011_土-豪-必-备.png"}}]},{"type":"Image","props":{"y":130,"x":140,"skin":"assets/ui.message/z_0009_0.png"}},{"type":"Image","props":{"y":130,"x":110,"skin":"assets/ui.message/z_0009_0.png"}},{"type":"Image","props":{"y":130,"x":80,"skin":"assets/ui.message/z_0004_5.png"}},{"type":"Image","props":{"y":130,"x":50,"skin":"ui.message/z_0010_+.png"}},{"type":"Label","props":{"y":70,"x":120,"text":"永久","fontSize":30,"color":"#f4c506","bold":true}},{"type":"Label","props":{"y":70,"x":50,"text":"金币","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"skin":"assets/ui.common/button_yellow_big.png","scaleY":0.6,"scaleX":0.6,"right":40,"bottom":40},"child":[{"type":"Label","props":{"y":20,"x":30,"text":"立即升级","fontSize":40,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":80,"x":300,"skin":"assets/ui.common/money_diamond_2.png"}},{"type":"Label","props":{"y":78,"x":350,"text":"2000","fontSize":30,"color":"#ffffff"}}]},{"type":"Image","props":{"y":10,"x":50,"skin":"assets/ui.message/e_0010_图层-93.png"},"child":[{"type":"Image","props":{"y":14.000000000000028,"x":-29.000000000000064,"skin":"assets/ui.message/e_0011_组-1.png"},"child":[{"type":"Image","props":{"y":6,"x":60,"skin":"assets/ui.message/z_0012_勇-士-必-备-拷贝.png"}}]},{"type":"Image","props":{"y":130,"x":50,"skin":"ui.message/z_0010_+.png"}},{"type":"Image","props":{"y":130,"x":80,"skin":"assets/ui.message/z_0004_5.png"}},{"type":"Image","props":{"y":130,"x":110,"skin":"assets/ui.message/z_0009_0.png"}},{"type":"Image","props":{"y":130,"x":140,"skin":"assets/ui.message/z_0009_0.png"}},{"type":"Image","props":{"y":130,"x":180,"skin":"assets/ui.message/z_0001_%.png"}},{"type":"Label","props":{"y":70,"x":50,"text":"攻击力","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":150,"text":"永久","fontSize":30,"color":"#f4c506","bold":true}},{"type":"Button","props":{"skin":"assets/ui.common/button_yellow_big.png","scaleY":0.6,"scaleX":0.6,"right":40,"bottom":40},"child":[{"type":"Label","props":{"y":20,"x":30,"text":"立即升级","fontSize":40,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":80,"x":300,"skin":"assets/ui.common/money_diamond_2.png"}},{"type":"Label","props":{"y":78,"x":350,"text":"2000","fontSize":30,"color":"#ffffff"}}]},{"type":"Image","props":{"x":80,"skin":"assets/banners/banner_tank.png","scaleY":0.8,"scaleX":0.8,"bottom":0}}]}]};}
		]);
		return TankDialogUI;
	})(Dialog);
var TankSkillDialogUI=(function(_super){
		function TankSkillDialogUI(){
			
		    this.icon=null;
		    this.nameLabel=null;
		    this.levelLabel=null;
		    this.effectLabel=null;
		    this.coolDownLabel=null;

			TankSkillDialogUI.__super.call(this);
		}

		CLASS$(TankSkillDialogUI,'ui.Dialogs.TankSkillDialogUI',_super);
		var __proto__=TankSkillDialogUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TankSkillDialogUI.uiView);
		}

		STATICATTR$(TankSkillDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"mouseThrough":true,"mouseEnabled":true,"height":300},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","mouseEnabled":true,"height":300}},{"type":"Button","props":{"y":29.999999999999996,"x":516,"top":20,"skin":"assets/ui.common/button_close.png","right":20,"name":"close"}},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"top","height":100},"child":[{"type":"Image","props":{"y":15,"x":20,"width":78,"var":"icon","skin":"assets/icons/skills/square/100101.jpg","height":78}},{"type":"Image","props":{"y":15,"x":20,"skin":"assets/ui.common/Frame_hero_grey.png"}},{"type":"Label","props":{"y":15,"x":120,"var":"nameLabel","text":"技能名","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":50,"x":120,"var":"levelLabel","text":"等级：4","fontSize":18,"color":"#ffffff"}}]},{"type":"Box","props":{"x":10,"width":580,"name":"message_txt","height":180,"bottom":10},"child":[{"type":"Image","props":{"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":180}},{"type":"Label","props":{"y":30,"x":30,"var":"effectLabel","text":"瞬间攻击力提升210倍","fontSize":18,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":30,"var":"coolDownLabel","text":"持续时间：0秒  I   冷却：600秒","fontSize":16,"color":"#ffffff"}}]}]};}
		]);
		return TankSkillDialogUI;
	})(Dialog);
var WeaponDialogUI=(function(_super){
		function WeaponDialogUI(){
			

			WeaponDialogUI.__super.call(this);
		}

		CLASS$(WeaponDialogUI,'ui.Dialogs.WeaponDialogUI',_super);
		var __proto__=WeaponDialogUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(WeaponDialogUI.uiView);
		}

		STATICATTR$(WeaponDialogUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":890},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","name":"background","height":890},"child":[{"type":"Image","props":{"y":200,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":600}}]},{"type":"Box","props":{"y":0,"x":0,"width":600,"name":"Top","height":200},"child":[{"type":"Image","props":{"skin":"assets/icons/heros/1001.jpg","scaleY":0.5,"scaleX":0.5,"left":120,"bottom":10}},{"type":"Label","props":{"y":60,"x":30,"text":"每日任务和比赛可以收集武器点。","name":"来源提示","fontSize":22,"color":"#ffffff","bold":false}},{"type":"Image","props":{"y":124.80000000000001,"skin":"assets/ui.battle/equipView2.png","scaleY":0.8,"scaleX":0.8,"right":120,"bottom":20}},{"type":"Text","props":{"y":137.4,"x":490,"width":80,"text":"X999","name":"point","height":30,"fontSize":"26","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":20,"x":30,"text":"武器熔炉","name":"武器熔炉","fontSize":30,"color":"#ffffff","bold":true}},{"type":"Label","props":{"x":80,"visible":false,"text":"请选择武器查看更多信息","name":"提示","fontSize":20,"color":"#ffffff","bottom":20}},{"type":"Image","props":{"skin":"assets/icons/weapons/10001.jpg","left":30,"bottom":10}},{"type":"Label","props":{"y":115,"x":120,"text":"武器等级：1","fontSize":24,"color":"#fffffff"},"child":[{"type":"Label","props":{"y":30,"x":70,"text":"风暴米酒.李","fontSize":18,"color":"#fffff"}}]},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"label":"label"}}]},{"type":"Box","props":{"y":200,"x":25,"width":550,"name":"equiptIcon","height":600},"child":[{"type":"Image","props":{"y":20,"top":20,"skin":"assets/icons/weapons/10001.jpg","name":"1","left":20,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":20,"x":130,"top":20,"skin":"assets/icons/weapons/10002.jpg","name":"2"}},{"type":"Image","props":{"y":20,"x":240,"top":20,"skin":"assets/icons/weapons/10003.jpg","name":"3"}},{"type":"Image","props":{"y":20,"x":350,"top":20,"skin":"assets/icons/weapons/10004.jpg","name":"4"}},{"type":"Image","props":{"y":20,"x":460,"top":20,"skin":"assets/icons/weapons/10005.jpg","right":20,"name":"5"}},{"type":"Image","props":{"y":118,"x":20,"skin":"assets/icons/weapons/10006.jpg","name":"6","left":20}},{"type":"Image","props":{"y":118,"x":130,"skin":"assets/icons/weapons/10007.jpg","name":"7"}},{"type":"Image","props":{"y":118,"x":240,"skin":"assets/icons/weapons/10008.jpg","name":"8"}},{"type":"Image","props":{"y":118,"x":350,"skin":"assets/icons/weapons/10009.jpg","name":"9"}},{"type":"Image","props":{"y":118,"x":460,"skin":"assets/icons/weapons/10010.jpg","right":20,"name":"10"}},{"type":"Image","props":{"y":216,"x":20,"skin":"assets/icons/weapons/10011.jpg","name":"11","left":20}},{"type":"Image","props":{"y":216,"x":130,"skin":"assets/icons/weapons/10012.jpg","name":"12"}},{"type":"Image","props":{"y":216,"x":240,"skin":"assets/icons/weapons/10013.jpg","name":"13"}},{"type":"Image","props":{"y":216,"x":350,"skin":"assets/icons/weapons/10014.jpg","name":"14"}},{"type":"Image","props":{"y":216,"x":460,"skin":"assets/icons/weapons/10015.jpg","right":20,"name":"15"}},{"type":"Image","props":{"y":314,"skin":"assets/icons/weapons/10016.jpg","name":"16","left":20}},{"type":"Image","props":{"y":314,"x":135,"skin":"assets/icons/weapons/10017.jpg","name":"17"}},{"type":"Image","props":{"y":314,"x":243,"skin":"assets/icons/weapons/10018.jpg","name":"18"}},{"type":"Image","props":{"y":314,"x":343,"skin":"assets/icons/weapons/10019.jpg","name":"19"}},{"type":"Image","props":{"y":314,"skin":"assets/icons/weapons/10020.jpg","right":20,"name":"20"}},{"type":"Image","props":{"y":412,"x":20,"skin":"assets/icons/weapons/10021.jpg","name":"21","left":20}},{"type":"Image","props":{"y":412,"x":130,"skin":"assets/icons/weapons/10022.jpg","name":"22"}},{"type":"Image","props":{"y":412,"x":240,"skin":"assets/icons/weapons/10023.jpg","name":"23"}},{"type":"Image","props":{"y":412,"x":350,"width":70,"skin":"assets/icons/weapons/10024.jpg","pivotY":-2.5,"name":"24","height":70}},{"type":"Image","props":{"y":412,"x":460,"skin":"assets/icons/weapons/10025.jpg","right":20,"name":"25"}},{"type":"Image","props":{"y":510,"x":20,"skin":"assets/icons/weapons/10026.jpg","name":"26","left":20,"bottom":20}},{"type":"Image","props":{"y":510,"x":130,"skin":"assets/icons/weapons/10027.jpg","name":"27"}},{"type":"Image","props":{"y":510,"x":240,"skin":"assets/icons/weapons/10028.jpg","name":"28"}},{"type":"Image","props":{"y":510,"x":350,"skin":"assets/icons/weapons/10029.jpg","name":"29"}},{"type":"Image","props":{"y":510,"x":460,"skin":"assets/icons/weapons/10030.jpg","right":20,"name":"30","bottom":20}}]},{"type":"Button","props":{"width":570,"skin":"assets/ui.common/button_match_blue.png","left":15,"height":80,"bottom":15},"child":[{"type":"Label","props":{"x":0,"width":570,"top":6,"text":"全套进展00/30","fontSize":26,"color":"#ffffff","bottom":8,"bold":true,"align":"center"}}]}]};}
		]);
		return WeaponDialogUI;
	})(Dialog);
var BattleLoseTipsUI=(function(_super){
		function BattleLoseTipsUI(){
			

			BattleLoseTipsUI.__super.call(this);
		}

		CLASS$(BattleLoseTipsUI,'ui.Tips.BattleLoseTipsUI',_super);
		var __proto__=BattleLoseTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(BattleLoseTipsUI.uiView);
		}

		STATICATTR$(BattleLoseTipsUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":400}},{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"5,0,0,0","height":150},"child":[{"type":"TextArea","props":{"y":10,"x":10,"width":560,"text":"无法在规定时间内击败魔王。请先把自己变强吧！","height":130,"fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"skin":"assets/banners/banner_boss.png","left":20,"bottom":0}},{"type":"Button","props":{"skin":"assets/ui.common/button_reborn_blue.png","right":40,"name":"close","bottom":50},"child":[{"type":"Label","props":{"y":10,"x":50,"text":"确定","fontSize":40,"color":"#fffffff"}}]},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":90},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"无法击败魔王","fontSize":40,"color":"#ffffff"}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10,"name":"close"}}]}]};}
		]);
		return BattleLoseTipsUI;
	})(Dialog);
var OffineTipsUI=(function(_super){
		function OffineTipsUI(){
			

			OffineTipsUI.__super.call(this);
		}

		CLASS$(OffineTipsUI,'ui.Tips.OffineTipsUI',_super);
		var __proto__=OffineTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(OffineTipsUI.uiView);
		}

		STATICATTR$(OffineTipsUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":400}},{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"10,0,0,0","height":150},"child":[{"type":"Box","props":{"y":10,"x":0,"width":450,"name":"MessageTxt","height":280},"child":[{"type":"TextArea","props":{"y":0,"x":10,"width":420,"text":"在您下线期间，你雇佣的英雄仍然奋勇作战。下次上线时，请记得领取英雄作战带来的收益。","height":134,"fontSize":24,"color":"#ffffff"}}]},{"type":"Image","props":{"skin":"assets/banners/gold.png","right":20,"bottom":30}}]},{"type":"Box","props":{"y":10,"x":10,"width":580,"name":"Top","height":90},"child":[{"type":"Label","props":{"y":20,"x":20,"text":"离线金币领取","fontSize":40,"color":"#ffffff"}},{"type":"Button","props":{"top":10,"skin":"assets/ui.common/button_close.png","right":10}}]},{"type":"Image","props":{"y":228,"x":36,"skin":"assets/banners/hero.png","scaleY":0.8,"scaleX":0.8,"left":36}},{"type":"Button","props":{"y":291,"x":324,"skin":"assets/ui.common/button_reborn_blue.png","right":92,"labelSize":40,"labelColors":"#ffffff","labelAlign":"center","label":"确定","bottom":46}}]};}
		]);
		return OffineTipsUI;
	})(Dialog);
var OfflineGoldTipsUI=(function(_super){
		function OfflineGoldTipsUI(){
			
		    this.getBtn=null;
		    this.getx2Btn=null;
		    this.getx10Btn=null;
		    this.goldLab=null;

			OfflineGoldTipsUI.__super.call(this);
		}

		CLASS$(OfflineGoldTipsUI,'ui.Tips.OfflineGoldTipsUI',_super);
		var __proto__=OfflineGoldTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(OfflineGoldTipsUI.uiView);
		}

		STATICATTR$(OfflineGoldTipsUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"width":600,"mouseThrough":true,"mouseEnabled":true,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","mouseThrough":false,"mouseEnabled":true,"height":400}},{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"20,0,0,0","height":290},"child":[{"type":"Box","props":{"y":120,"x":0,"width":580,"height":150,"bottom":30},"child":[{"type":"Image","props":{"y":10,"x":30,"var":"getBtn","skin":"assets/ui.message/image_freebox.png","left":30}},{"type":"Image","props":{"y":10,"x":225,"var":"getx2Btn","skin":"assets/ui.message/image_2timebox.png"}},{"type":"Image","props":{"y":10,"x":421,"var":"getx10Btn","skin":"assets/ui.message/image_10timebox.png","right":30}},{"type":"Image","props":{"y":127,"x":439,"skin":"assets/ui.message/txt_10time.png","right":45,"bottom":0}},{"type":"Image","props":{"y":127,"x":55,"skin":"assets/ui.message/txt_1time.png","bottom":0}},{"type":"Image","props":{"y":127,"x":250,"skin":"assets/ui.message/txt_2time.png"}}]},{"type":"Box","props":{"y":0,"x":0,"width":580,"name":"GoldMessage","height":100},"child":[{"type":"Image","props":{"y":27.000000000000004,"skin":"assets/ui.battle/icon_gold.png","scaleY":0.7,"scaleX":0.7,"left":180,"bottom":10}},{"type":"Label","props":{"y":45,"x":264,"width":298,"var":"goldLab","text":"700.99BB","right":18,"height":30,"fontSize":30,"color":"#ffffff","bold":true}}]}]},{"type":"Button","props":{"top":20,"skin":"assets/ui.common/button_close.png","right":20,"name":"close"}},{"type":"Image","props":{"y":31,"x":171,"skin":"assets/ui.message/txt_offlinegold.png"}}]};}
		]);
		return OfflineGoldTipsUI;
	})(Dialog);
var BattleViewUI=(function(_super){
		function BattleViewUI(){
			
		    this.background01=null;
		    this.spriteMob=null;
		    this.background02=null;
		    this.background03=null;
		    this.background04=null;
		    this.background05=null;
		    this.background06=null;
		    this.backgroudDPS=null;
		    this.currentDPSLabel=null;
		    this.tapDPSLabel=null;
		    this.heroDPSLabel=null;
		    this.boxHeros=null;
		    this.levelIconNode=null;
		    this.Sprite_heavenlyStrike=null;
		    this.heavenlyStrike=null;
		    this.skillTimebar_1=null;
		    this.skillTimeText_1=null;
		    this.Sprite_shadowClone=null;
		    this.shadowClone=null;
		    this.skillTimebar_2=null;
		    this.skillTimeText_2=null;
		    this.Sprite_criticalStrike=null;
		    this.criticalStrike=null;
		    this.skillTimebar_3=null;
		    this.skillTimeText_3=null;
		    this.Sprite_warCry=null;
		    this.warCry=null;
		    this.skillTimebar_4=null;
		    this.skillTimeText_4=null;
		    this.Sprite_berserkerRage=null;
		    this.berserkerRage=null;
		    this.skillTimebar_5=null;
		    this.skillTimeText_5=null;
		    this.Sprite_handOfMidas=null;
		    this.handOfMidas=null;
		    this.skillTimebar_6=null;
		    this.skillTimeText_6=null;
		    this.offLineGoldBtn=null;
		    this.progressMobBlood=null;
		    this.mobTime=null;
		    this.mobName=null;
		    this.mobHealth=null;
		    this.bossNum=null;
		    this.leaveBtn=null;
		    this.bossBtn=null;
		    this.relics=null;
		    this.diamond=null;
		    this.copper=null;
		    this.relicsNumLab=null;
		    this.diamondNumLab=null;
		    this.mobCDTime=null;
		    this.spriteTank=null;
		    this.spriteText=null;
		    this.boxUI=null;
		    this.boxTabContent=null;
		    this.background=null;
		    this.bgStatus=null;
		    this.btnHide=null;
		    this.boxTabView=null;
		    this.rateBtn3=null;
		    this.rateBtn2=null;
		    this.rateBtn1=null;
		    this.rateBtn0=null;
		    this.rateBtn=null;
		    this.boxTabButton=null;
		    this.tabTank=null;
		    this.tabHero=null;
		    this.tabArtifact=null;
		    this.tabDiamond=null;
		    this.tabTank2=null;
		    this.tabHero2=null;
		    this.tabArtifact2=null;
		    this.tabDiamond2=null;

			BattleViewUI.__super.call(this);
		}

		CLASS$(BattleViewUI,'ui.Views.BattleViewUI',_super);
		var __proto__=BattleViewUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(BattleViewUI.uiView);
		}

		STATICATTR$(BattleViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":0,"x":0,"width":640,"height":1136,"color":"#ffffff"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"var":"background01","skin":"assets/maps/10001/bg001.jpg","height":617}},{"type":"Sprite","props":{"y":617,"x":320,"visible":false,"var":"spriteMob"}},{"type":"Image","props":{"y":617,"x":0,"width":640,"var":"background02","skin":"assets/maps/10001/bg002.png","height":521}},{"type":"Image","props":{"y":476,"x":0,"var":"background03","skin":"assets/maps/10001/bg003.png"}},{"type":"Image","props":{"y":476,"x":464,"var":"background04","skin":"assets/maps/10001/bg004.png"}},{"type":"Image","props":{"y":317,"x":0,"var":"background05","skin":"assets/maps/10001/bg005.png"}},{"type":"Image","props":{"y":318,"x":470,"var":"background06","skin":"assets/maps/10001/bg006.png"}},{"type":"Image","props":{"y":800,"x":10,"var":"backgroudDPS","skin":"assets/ui.battle/bg_dps.png"},"child":[{"type":"Image","props":{"y":100,"x":9,"skin":"assets/ui.battle/bg_dps_current.png"}},{"type":"Image","props":{"y":50,"x":257.00000000000006,"skin":"assets/ui.battle/bg_dps_tap.png","scaleY":1,"scaleX":0.95}},{"type":"Image","props":{"y":100,"x":238.00000000000006,"skin":"assets/ui.battle/bg_dps_hero.png","scaleY":1,"scaleX":0.95}},{"type":"Label","props":{"y":74,"x":50,"text":"当前DPS","fontSize":20,"color":"#D7C4C4","align":"center"}},{"type":"Label","props":{"y":26,"x":499,"text":"点击攻击力","fontSize":20,"color":"#D7C4C4","align":"center"}},{"type":"Label","props":{"y":78,"x":518,"text":"英雄DPS","fontSize":20,"color":"#D7C4C4"}},{"type":"Text","props":{"y":24,"x":10,"width":190,"var":"currentDPSLabel","height":33,"fontSize":"28","font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Text","props":{"y":15,"x":262,"width":228,"var":"tapDPSLabel","height":41,"fontSize":"28","font":"Arial","color":"#ffffff","bold":true,"align":"center"}},{"type":"Text","props":{"y":68,"x":262,"width":228,"var":"heroDPSLabel","height":41,"fontSize":"28","font":"Arial","color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"var":"boxHeros","height":1136},"child":[{"type":"Sprite","props":{"y":616.9999999999999,"x":202.00000000000014,"visible":false,"name":"105"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":154.99999999999997,"visible":false,"name":"104"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":107.00000000000016,"visible":false,"name":"103"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":57.99999999999982,"visible":false,"name":"102"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":9.999999999999998,"visible":false,"name":"101"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":409.99999999999994,"visible":false,"name":"201"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":458.00000000000006,"visible":false,"name":"202"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":504.9999999999999,"visible":false,"name":"203"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":554.9999999999999,"visible":false,"name":"204"}},{"type":"Sprite","props":{"y":616.9999999999999,"x":603,"visible":false,"name":"205"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":154.00000000000003,"visible":false,"name":"109"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":105.99999999999993,"visible":false,"name":"108"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":57.99999999999982,"visible":false,"name":"107"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":9.999999999999998,"visible":false,"name":"106"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":468.00000000000006,"visible":false,"name":"206"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":514.9999999999999,"visible":false,"name":"207"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":564,"visible":false,"name":"208"}},{"type":"Sprite","props":{"y":479.9999999999999,"x":613,"visible":false,"name":"209"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":149.99999999999997,"visible":false,"name":"113"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":99.99999999999999,"visible":false,"name":"112"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":59.999999999999986,"visible":false,"name":"111"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":19.999999999999996,"visible":false,"name":"110"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":479.9999999999999,"visible":false,"name":"213"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":523,"visible":false,"name":"212"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":567.0000000000001,"visible":false,"name":"211"}},{"type":"Sprite","props":{"y":321.99999999999994,"x":609.9999999999999,"visible":false,"name":"210"}},{"type":"Sprite","props":{"y":222,"x":127.9999999999998,"visible":false,"name":"115"}},{"type":"Sprite","props":{"y":222,"x":79.99999999999999,"visible":false,"name":"114"}},{"type":"Sprite","props":{"y":222,"x":479.9999999999999,"visible":false,"name":"215"}},{"type":"Sprite","props":{"y":222,"x":529,"visible":false,"name":"214"}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"visible":false,"name":"Top","height":100},"child":[{"type":"Image","props":{"y":40,"x":320,"skin":"assets/ui.battle/bg_stage.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":9.999999999999998,"x":535,"skin":"assets/ui.battle/achievements.png"}},{"type":"Image","props":{"y":9.999999999999998,"x":589.9999999999997,"skin":"assets/ui.battle/sys.png","right":10}},{"type":"Image","props":{"y":10,"x":450,"skin":"assets/ui.battle/rank.png"}},{"type":"Image","props":{"y":40,"x":320,"width":0,"var":"levelIconNode","height":0,"anchorX":0.5}},{"type":"Image","props":{"y":10,"x":100,"skin":"assets/ui.battle/icon_activity.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":10,"x":10,"skin":"assets/ui.battle/icon_shop.png"}}]},{"type":"Box","props":{"width":640,"visible":false,"name":"Skills","left":0,"height":100,"bottom":100},"child":[{"type":"Sprite","props":{"y":0,"x":0,"var":"Sprite_heavenlyStrike"},"child":[{"type":"Circle","props":{"y":50,"x":57.999999999999936,"radius":48,"lineWidth":1,"fillColor":"#000000"}},{"type":"Image","props":{"y":6.999999999999886,"x":13.999999999999947,"visible":true,"var":"heavenlyStrike","skin":"assets/ui.battle/SKILL_round96_100101.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":49,"x":56,"var":"skillTimebar_1","skin":"assets/ui.battle/bg_skill_CD.png","mouseThrough":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":38.999999999999886,"x":18.99999999999999,"var":"skillTimeText_1","text":"00:00:00","fontSize":"20","color":"#ffffff"}}]},{"type":"Sprite","props":{"y":0,"x":100,"var":"Sprite_shadowClone"},"child":[{"type":"Circle","props":{"y":50,"x":64.00000000000006,"radius":48,"lineWidth":1,"fillColor":"#000000"}},{"type":"Image","props":{"y":5,"x":20,"visible":true,"var":"shadowClone","skin":"assets/ui.battle/SKILL_round96_100102.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":49,"x":63,"var":"skillTimebar_2","skin":"assets/ui.battle/bg_skill_CD.png","mouseThrough":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":39,"x":24.00000000000003,"var":"skillTimeText_2","text":"00:00:00","fontSize":"20","color":"#ffffff"}}]},{"type":"Sprite","props":{"y":0,"x":210,"var":"Sprite_criticalStrike"},"child":[{"type":"Circle","props":{"y":50,"x":58.99999999999994,"radius":48,"lineWidth":1,"fillColor":"#000000"}},{"type":"Image","props":{"y":8,"x":14.000000000000028,"visible":true,"var":"criticalStrike","skin":"assets/ui.battle/SKILL_round96_100103.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":50,"x":59,"var":"skillTimebar_3","skin":"assets/ui.battle/bg_skill_CD.png","mouseThrough":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":39,"x":20.000000000000057,"var":"skillTimeText_3","text":"00:00:00","fontSize":"20","color":"#ffffff"}}]},{"type":"Sprite","props":{"y":0,"x":317,"var":"Sprite_warCry"},"child":[{"type":"Circle","props":{"y":50,"x":58,"radius":48,"lineWidth":1,"fillColor":"#000000"}},{"type":"Image","props":{"y":7,"x":13.000000000000057,"visible":true,"var":"warCry","skin":"assets/ui.battle/SKILL_round96_100104.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":51,"x":58,"var":"skillTimebar_4","skin":"assets/ui.battle/bg_skill_CD.png","mouseThrough":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":39,"x":17.999999999999943,"var":"skillTimeText_4","text":"00:00:00","fontSize":"20","color":"#ffffff"}}]},{"type":"Sprite","props":{"y":0,"x":420,"var":"Sprite_berserkerRage"},"child":[{"type":"Circle","props":{"y":50,"x":59.999999999999886,"radius":48,"lineWidth":1,"fillColor":"#000000"}},{"type":"Image","props":{"y":8,"x":16.000000000000114,"visible":true,"var":"berserkerRage","skin":"assets/ui.battle/SKILL_round96_100105.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":51,"x":60,"var":"skillTimebar_5","skin":"assets/ui.battle/bg_skill_CD.png","mouseThrough":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":39,"x":21,"var":"skillTimeText_5","text":"00:00:00","fontSize":"20","color":"#ffffff"}}]},{"type":"Sprite","props":{"y":0,"x":525,"var":"Sprite_handOfMidas"},"child":[{"type":"Circle","props":{"y":50,"x":61.000000000000114,"radius":48,"lineWidth":1,"fillColor":"#000000"}},{"type":"Image","props":{"y":7,"x":16,"visible":true,"var":"handOfMidas","skin":"assets/ui.battle/SKILL_round96_100106.png","scaleY":0.9,"scaleX":0.9}},{"type":"Image","props":{"y":50,"x":60,"var":"skillTimebar_6","skin":"assets/ui.battle/bg_skill_CD.png","mouseThrough":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Text","props":{"y":39,"x":25,"var":"skillTimeText_6","text":"00:00:00","fontSize":"20","color":"#ffffff"}}]}]},{"type":"Box","props":{"y":656,"x":0,"width":640,"name":"Chargeprop","height":120,"bottom":360},"child":[{"type":"Image","props":{"y":11,"x":16,"skin":"assets/ui.battle/Chargeprop_round86_goldraint.jpg","left":16,"bottom":23}},{"type":"Image","props":{"y":3.9999999999998863,"x":145.00000000000003,"skin":"assets/ui.battle/Chargeprop_round86_holding.jpg"}},{"type":"Image","props":{"y":10,"x":268,"skin":"assets/ui.battle/Chargeprop_round86_protect.jpg"}},{"type":"Image","props":{"y":10,"x":528,"skin":"assets/ui.battle/Chargeprop_round86_secondkill.png"}},{"type":"Image","props":{"x":138,"skin":"assets/ui.battle/bg_skill_frame_Charge prop.png","name":"3","bottom":15}},{"type":"Image","props":{"x":145,"skin":"assets/ui.battle/bg_skill_kuang_txt_Charge prop.png","name":"4","bottom":0}},{"type":"Image","props":{"x":9.999999999999998,"skin":"assets/ui.battle/bg_skill_frame_Charge prop.png","name":"1","left":10,"bottom":15}},{"type":"Image","props":{"skin":"assets/ui.battle/bg_skill_kuang_txt_Charge prop.png","name":"2","left":18,"bottom":0}},{"type":"Image","props":{"x":260,"skin":"assets/ui.battle/bg_skill_frame_Charge prop.png","name":"5","bottom":15}},{"type":"Image","props":{"x":268,"skin":"assets/ui.battle/bg_skill_kuang_txt_Charge prop.png","name":"6","bottom":0}},{"type":"Image","props":{"y":20,"skin":"assets/ui.battle/bg_skill_frame_Charge prop.png","right":18,"name":"7","bottom":15}},{"type":"Image","props":{"y":10,"skin":"assets/ui.battle/bg_skill_kuang_txt_Charge prop.png","right":20,"name":"8","bottom":0}}]},{"type":"Box","props":{"y":60,"width":640,"visible":true,"name":"Activity","mouseThrough":true,"height":450},"child":[{"type":"Image","props":{"y":19.999999999999986,"x":9.999999999999998,"visible":false,"skin":"assets/ui.battle/openMatch.png","scaleY":0.8,"scaleX":0.8,"left":10}},{"type":"Image","props":{"y":189.99999999999994,"x":9.999999999999998,"visible":false,"var":"offLineGoldBtn","skin":"assets/ui.battle/off_lineaward.png","scaleY":0.8,"scaleX":0.8,"left":10}},{"type":"Image","props":{"y":19.999999999999986,"x":9.999999999999998,"visible":false,"skin":"assets/ui.battle/icon_match_over.png","scaleY":0.8,"scaleX":0.8,"left":10}},{"type":"Image","props":{"y":19.999999999999986,"x":9.999999999999998,"visible":false,"skin":"assets/ui.battle/icon_match_ing.png","scaleY":0.8,"scaleX":0.8,"left":10}},{"type":"Image","props":{"y":360,"x":9.999999999999998,"visible":false,"skin":"assets/ui.battle/icon_dailymission_WORLDBOSS.png","scaleY":0.8,"scaleX":0.8,"left":10}},{"type":"Image","props":{"y":279.99999999999994,"x":9.999999999999998,"visible":"false","skin":"assets/ui.battle/icon_dailymission_BOSS.png","scaleY":0.8,"scaleX":0.8,"left":10}},{"type":"Image","props":{"y":179.00000000000003,"x":554,"visible":false,"skin":"assets/ui.battle/icon_7day.png","scaleY":0.8,"scaleX":0.8}},{"type":"Image","props":{"y":110,"x":9.999999999999998,"visible":false,"skin":"assets/ui.battle/equipView2.png","left":10}},{"type":"Image","props":{"y":54.999999999999986,"x":170.99999999999991,"visible":false,"skin":"assets/ui.battle/Chargeprop_quickuse_secondkill.jpg","scaleY":0.7,"scaleX":0.7}}]},{"type":"Box","props":{"y":100,"x":0,"width":640,"visible":false,"name":"Monster","mouseThrough":true,"height":60,"anchorY":0.5,"anchorX":0},"child":[{"type":"ProgressBar","props":{"y":10,"x":320,"width":296,"var":"progressMobBlood","value":0,"top":10,"skin":"assets/ui.battle/progress_blood.png","sizeGrid":"2,2,2,2","scaleX":-1,"height":20,"anchorY":0.5,"anchorX":0.5}},{"type":"ProgressBar","props":{"x":320,"width":296,"var":"mobTime","value":1,"top":30,"skin":"assets/ui.battle/img_timeline.png","height":8,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":18,"x":467.99999999999994,"var":"mobName","text":"Flying Test","left":174,"fontSize":20,"anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":18,"x":468,"width":114,"var":"mobHealth","text":"123.45E+789","height":18,"fontSize":18,"anchorY":0.5,"anchorX":1,"align":"right"}},{"type":"Image","props":{"y":5,"x":500,"skin":"assets/ui.battle/monster.png","bottom":20}},{"type":"Label","props":{"y":7,"x":543,"width":77,"var":"bossNum","text":"10/10","height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"x":490,"visible":false,"var":"leaveBtn","stateNum":"3","skin":"assets/ui.common/button_reborn_red.png","scaleY":0.7,"scaleX":0.7,"labelStrokeColor":"#f1f10b","labelSize":30,"labelColors":"#ffffff","label":"离开"}},{"type":"Button","props":{"x":490,"visible":false,"var":"bossBtn","skin":"assets/ui.common/button_reborn_blue.png","scaleY":0.7,"scaleX":0.7,"labelSize":30,"labelColors":"#ffffff","label":"挑战魔王"}},{"type":"Image","props":{"y":57,"x":36,"visible":false,"var":"relics","skin":"assets/ui.common/artifactIcon_2.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":62.5,"x":510,"visible":false,"var":"diamond","skin":"assets/ui.common/money_diamond_2.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":60.5,"x":320,"var":"copper","skin":"assets/ui.common/money_copper_1.png","anchorY":0.5,"anchorX":1}},{"type":"Label","props":{"y":58,"x":165,"width":108,"visible":false,"var":"relicsNumLab","text":"123.45E+789","height":18,"fontSize":18,"color":"#ffffff","anchorY":0.5,"anchorX":1,"align":"left"}},{"type":"Label","props":{"y":62,"x":641,"width":111,"visible":false,"var":"diamondNumLab","text":"123.45E+789","height":18,"fontSize":18,"color":"#ffffff","anchorY":0.5,"anchorX":1,"align":"left"}},{"type":"Label","props":{"y":26,"x":43,"width":124,"visible":false,"var":"mobCDTime","text":"100.1","left":43,"height":33,"fontSize":26,"color":"#ff5a09","anchorY":0.5,"anchorX":0,"align":"right"}}]},{"type":"Sprite","props":{"y":617,"x":320,"visible":false,"var":"spriteTank"}},{"type":"Sprite","props":{"y":372.99999999999994,"x":313.99999999999994,"var":"spriteText"}},{"type":"Box","props":{"width":640,"var":"boxUI","left":0,"height":510,"bottom":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"visible":false,"var":"boxTabContent","height":510},"child":[{"type":"Image","props":{"y":86.99999999999999,"x":0,"width":640,"var":"background","skin":"assets/ui.scene/bg.png","left":0,"bottom":0}},{"type":"Image","props":{"y":37,"x":0,"width":640,"var":"bgStatus","top":37,"skin":"assets/ui.scene/bg_title.png","left":0,"height":50}},{"type":"Button","props":{"y":2,"x":542,"visible":true,"var":"btnHide","top":2,"skin":"assets/ui.scene/button_hide.png","anchorY":0}},{"type":"Box","props":{"y":100,"x":10,"width":620,"visible":true,"var":"boxTabView","height":330}},{"type":"Button","props":{"y":43.999999999999886,"x":126,"width":100,"var":"rateBtn3","stateNum":"1","skin":"assets/ui.scene/btn2_1.png","labelSize":20,"labelColors":"#ffffff","label":"Max","height":42}},{"type":"Button","props":{"y":43.999999999999886,"x":221,"width":100,"var":"rateBtn2","stateNum":"1","skin":"assets/ui.scene/btn2_1.png","labelSize":20,"labelColors":"#ffffff","label":"x100","height":42}},{"type":"Button","props":{"y":43.999999999999886,"x":318,"width":100,"var":"rateBtn1","stateNum":"1","skin":"assets/ui.scene/btn2_1.png","labelSize":20,"labelColors":"#ffffff","label":"x10","height":42}},{"type":"Button","props":{"y":43.999999999999886,"x":415,"width":100,"var":"rateBtn0","stateNum":"1","skin":"assets/ui.scene/btn2_1.png","labelSize":20,"labelColors":"#ffffff","label":"x1","height":42}},{"type":"Button","props":{"y":43.999999999999886,"x":512,"width":129,"var":"rateBtn","stateNum":"1","skin":"assets/ui.scene/btn2_3.png","labelSize":20,"labelColors":"#ffffff","label":"x1","height":42}}]},{"type":"Image","props":{"y":444,"x":0,"width":640,"skin":"assets/ui.common/bg_UI_line.png","name":"split","cacheAsBitmap":true}},{"type":"Box","props":{"x":0,"width":640,"var":"boxTabButton","height":64,"bottom":4},"child":[{"type":"Image","props":{"y":4,"x":8,"var":"tabTank","skin":"assets/ui.common/icon_MT_off.png"}},{"type":"Image","props":{"y":4,"x":166,"width":150,"var":"tabHero","skin":"assets/ui.common/icon_hero_off.png","height":63}},{"type":"Image","props":{"y":4,"x":324,"var":"tabArtifact","skin":"assets/ui.common/icon_honor_off.png"}},{"type":"Image","props":{"y":4,"x":482,"var":"tabDiamond","skin":"assets/ui.common/icon_shop_off.png","right":8}},{"type":"Image","props":{"y":0,"x":8,"visible":false,"var":"tabTank2","skin":"assets/ui.common/icon_MT_on.png","left":8}},{"type":"Image","props":{"y":0,"x":166,"visible":false,"var":"tabHero2","skin":"assets/ui.common/icon_hero_on.png"}},{"type":"Image","props":{"y":0,"x":324,"visible":false,"var":"tabArtifact2","skin":"assets/ui.common/icon_honor_on.png"}},{"type":"Image","props":{"y":0,"x":482,"visible":false,"var":"tabDiamond2","skin":"assets/ui.common/icon_shop_on.png","right":8}}]}]}]};}
		]);
		return BattleViewUI;
	})(View);
var CreateViewUI=(function(_super){
		function CreateViewUI(){
			
		    this.backgroud=null;
		    this.inputName=null;
		    this.btnEnter=null;

			CreateViewUI.__super.call(this);
		}

		CLASS$(CreateViewUI,'ui.Views.CreateViewUI',_super);
		var __proto__=CreateViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(CreateViewUI.uiView);
		}

		STATICATTR$(CreateViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":568,"x":320,"width":600,"var":"backgroud","skin":"assets/ui.common/bg_dialog.jpg","sizeGrid":"20,20,20,20","height":500,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":100,"x":10,"width":580,"skin":"assets/ui.common/bg_inside_S.png","sizeGrid":"5,0,0,0","height":390}}]},{"type":"Image","props":{"y":484,"x":43,"skin":"assets/banners/banner_tank.png","scaleY":0.8,"scaleX":0.8}},{"type":"TextArea","props":{"y":512,"x":268,"width":334,"text":"自从联盟和部落并肩作战，共同抵抗燃烧军团的入侵，已经过去了10年。世界再一次陷入混乱，震天的战鼓再一次响起，亟需一位英雄来平定。勇敢的MT拿起你的武器继续战斗！","name":"desc","height":200,"fontSize":20,"color":"#ffffff"}},{"type":"TextInput","props":{"y":682,"x":31,"width":578,"var":"inputName","text":"强力MT","promptColor":"#ffffff","prompt":"强力MT","overflow":"visible","height":40,"fontSize":30,"color":"#ffffff","bgColor":"#0a0101","align":"center"}},{"type":"Button","props":{"y":733,"x":198,"width":238,"var":"btnEnter","skin":"assets/ui.common/button_reborn_red.png","labelSize":36,"labelColors":"#ffffff","label":"我就是MT","height":64}}]};}
		]);
		return CreateViewUI;
	})(View);
var LoaderViewUI=(function(_super){
		function LoaderViewUI(){
			
		    this.background=null;
		    this.progress=null;
		    this.percent=null;
		    this.message=null;

			LoaderViewUI.__super.call(this);
		}

		CLASS$(LoaderViewUI,'ui.Views.LoaderViewUI',_super);
		var __proto__=LoaderViewUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoaderViewUI.uiView);
		}

		STATICATTR$(LoaderViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"var":"background","skin":"assets/loader/bg_loader.jpg","height":1136}},{"type":"ProgressBar","props":{"y":1056,"x":27,"width":600,"var":"progress","skin":"assets/loader/progress.png","sizeGrid":"3,5,3,5","height":46,"anchorY":0.5,"anchorX":0}},{"type":"Text","props":{"y":1035,"x":245,"var":"percent","text":"99.99%","fontSize":"38","color":"#ffffff"}},{"type":"Label","props":{"y":1005,"x":332,"width":300,"var":"message","valign":"middle","height":40,"fontSize":32,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};}
		]);
		return LoaderViewUI;
	})(View);
var LoginViewUI=(function(_super){
		function LoginViewUI(){
			
		    this.background=null;
		    this.serverNode=null;
		    this.selectBg=null;
		    this.btnEnter=null;
		    this.btnSelect=null;
		    this.textServerName=null;

			LoginViewUI.__super.call(this);
		}

		CLASS$(LoginViewUI,'ui.Views.LoginViewUI',_super);
		var __proto__=LoginViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoginViewUI.uiView);
		}

		STATICATTR$(LoginViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600},"child":[{"type":"Image","props":{"width":640,"var":"background","skin":"assets/loader/bg_loader.jpg","height":1136}},{"type":"Image","props":{"y":92,"x":340,"skin":"assets/ui.loading/logo.png","name":"logo","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":934,"x":320,"width":485,"var":"serverNode","height":189,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":31.5,"x":242.5,"var":"selectBg","skin":"assets/ui.loading/selectBg.png","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":139,"x":242.5,"width":301,"var":"btnEnter","stateNum":"2","skin":"assets/ui.loading/register.png","height":91,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":5,"x":319,"var":"btnSelect","stateNum":"1","skin":"assets/ui.loading/selectServer.png"}},{"type":"Label","props":{"y":17.5,"x":30,"width":214,"var":"textServerName","text":"xxxx开发服","height":30,"fontSize":30,"color":"#06f610","align":"left"}}]}]};}
		]);
		return LoginViewUI;
	})(View);