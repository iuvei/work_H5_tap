
(function(root) {
    var Config = root.Config = {};

    Config.actors = {
        //主角
        101:      { scale: 0.38, dir: 0 },

        //英雄
        1001:     { scale: 0.35, pos: 202, dir: 1, freq: 1000,skillList:[20001,20002,20003,20004,20005,20006,20007,20008],effect: { id: 200101, type: "attack" } ,desc:"善良的熊猫人奋起反抗，粉碎奴役的枷锁。" },
        1002:     { scale: 0.30, pos: 109, dir: 0, freq: 2400,skillList:[30001,30002,30003,30004,30005,30006,30007,30008],effect: { id: 200201, type: "shoot"  } ,desc:"被发狂的野兽咬伤的暗夜精灵而受到恶毒的诅咒，感染诅咒后变成狼人。" ,atkPos :{x:60,y:-35}},
        1003:     { scale: 0.35, pos: 105, dir: 0, freq: 1900,skillList:[40001,40002,40003,40004,40005,40006,40007,40008],effect: { id: 200301, type: "attack" } ,desc:"不肯屈服于邪恶势力的高智商居民---艾瑞达人的后裔。" },
        1004:     { scale: 0.28, pos: 102, dir: 0, freq: 3200,skillList:[50001,50002,50003,50004,50005,50006,50007,50008],effect: { id: 200401, type: "attack" } ,desc:"受到血肉诅咒的土灵蜕变成的矮人一次又一次的抵御了邪恶兽人的入侵。" },
        1005:     { scale: 0.30, pos: 211, dir: 1, freq: 3900,skillList:[60001,60002,60003,60004,60005,60006,60007,60008],effect: { id: 200501, type: "shoot"  } ,desc:"乐观的侏儒是杰出的发明家。即使面对灾难和毁灭也动摇不了他们的乐观精神。" ,atkPos :{x:-30,y:-40}},
        1006:     { scale: 0.36, pos: 112, dir: 0, freq: 3700,skillList:[70001,70002,70003,70004,70005,70006,70007,70008],effect: { id: 200601, type: "throw"  } ,desc:"暗夜精灵为了战胜残害他们家园的邪恶力量，付出了惨痛的代价，成为了最终的赢家。" ,atkPos :{x:50,y:-30}},
        1007:     { scale: 0.32, pos: 201, dir: 1, freq: 1700,skillList:[80001,80002,80003,80004,80005,80006,80007,80008],effect: { id: 200701, type: "attack" } ,desc:"曾被丛林巨魔奴役采矿的地精们在卡加矿石的影响下使种族变得惊人的聪明。" },
        1008:     { scale: 0.35, pos: 203, dir: 1, freq: 3100,skillList:[90001,90002,90003,90004,90005,90006,90007,90008],effect: { id: 200801, type: "shoot"  } ,desc:"最充满智慧的法师，能召唤强大又危险的火焰法术。" ,atkPos :{x:20,y:-120}},
        1009:     { scale: 0.45, pos: 209, dir: 1, freq: 1500,skillList:[100001,100002,100003,100004,100005,100006,100007,100008],effect: { id: 200901, type: "throw"  } ,desc:"曾经为了获得力量而被邪恶奴役的兽人，现在为了摆脱控制，组成了自由军团为自由而战。" ,atkPos :{x:-30,y:-40}},
        1010:     { scale: 0.50, pos: 205, dir: 1, freq: 2900,skillList:[110001,110002,110003,110004,110005,110006,110007,110008],effect: { id: 201001, type: "attack" } ,desc:"热爱大自然的德努伊以女神之名维护大自然的平衡。" },
        1011:     { scale: 0.35, pos: 215, dir: 1, freq: 2800,skillList:[120001,120002,120003,120004,120005,120006,120007,120008],effect: { id: 201101, type: "throw"  } ,desc:"一群拒绝堕落的巨魔族人加入部落一起对抗邪恶，守卫正义。" ,atkPos :{x:-15,y:-30},isFly:true},
        1012:     { scale: 0.30, pos: 207, dir: 1, freq: 3800,skillList:[130001,130002,130003,130004,130005,130006,130007,130008],effect: { id: 201201, type: "throw"  } ,desc:"一股挣脱邪恶控制的亡灵术士奋力去保护他们生前曾经珍视的一切。" ,atkPos :{x:-20,y:-60}},
        1013:     { scale: 0.55, pos: 101, dir: 0, freq: 3500,skillList:[140001,140002,140003,140004,140005,140006,140007,140008],effect: { id: 201301, type: "throw"  } ,desc:"体态臃肿，形状古怪的枭兽是月亮女神艾露恩的创造物，也是她所钟爱的宠物。" ,atkPos :{x:60,y:-110}},
        1014:     { scale: 0.33, pos: 208, dir: 1, freq: 3400,skillList:[150001,150002,150003,150004,150005,150006,150007,150008],effect: { id: 201401, type: "attack" } ,desc:"圣骑士的使命：保护弱者，消灭不公平，带来正义，并消除来自世界最黑暗角落的邪恶势力。" },
        1015:     { scale: 0.28, pos: 104, dir: 0, freq: 2300,skillList:[160001,160002,160003,160004,160005,160006,160007,160008],effect: { id: 201501, type: "shoot"  } ,desc:"暗夜潜行者凭借毒药和速度，令敌人无力保护自己。" ,atkPos :{x:0,y:-20}},
        1016:     { scale: 0.35, pos: 114, dir: 0, freq: 1200,skillList:[170001,170002,170003,170004,170005,170006,170007,170008],effect: { id: 201601, type: "throw"  } ,desc:"投靠黑暗力量以维持自身魔力的堕落血精灵。" ,atkPos :{x:55,y:-30},isFly:true},
        1017:     { scale: 0.35, pos: 115, dir: 0, freq: 1600,skillList:[180001,180002,180003,180004,180005,180006,180007,180008],effect: { id: 201701, type: "shoot"  } ,desc:"一股挣脱邪恶控制的亡灵牧师奋力去保护他们生前曾经珍视的一切。" ,atkPos :{x:30,y:-10},isFly:true},
        1018:     { scale: 0.35, pos: 213, dir: 1, freq: 1800,skillList:[190001,190002,190003,190004,190005,190006,190007,190008],effect: { id: 201801, type: "throw"  } ,desc:"为了曾经骄傲的部族，从濒临灭绝边缘救赎被屈从和放逐历史折磨着的同伴。" ,atkPos :{x:-50,y:-60}},
        1019:     { scale: 0.28, pos: 107, dir: 0, freq: 2100,skillList:[200001,200002,200003,200004,200005,200006,200007,200008],effect: { id: 201901, type: "attack" } ,desc:"为了维护公平和正义，坚强的矮人战士在严酷的环境中抵御着邪恶势力的入侵。" },
        1020:     { scale: 0.28, pos: 206, dir: 1, freq: 3000,skillList:[210001,210002,210003,210004,210005,210006,210007,210008],effect: { id: 202001, type: "attack" } ,desc:"乐观的侏儒圣骑坚信正义必胜，坚定与邪恶对抗。" },
        1021:     { scale: 0.35, pos: 106, dir: 0, freq: 3300,skillList:[220001,220002,220003,220004,220005,220006,220007,220008],effect: { id: 202101, type: "throw"  } ,desc:"熊猫人战士拿起武器，奋起反抗奴役的枷锁。" ,atkPos :{x:0,y:0}},
        1022:     { scale: 0.20, pos: 204, dir: 1, freq: 1300,skillList:[230001,230002,230003,230004,230005,230006,230007,230008],effect: { id: 202201, type: "throw"  } ,desc:"杰出的地精工程师用机械把自己从头到脚武装起来。缺点是需要上发条。" ,atkPos :{x:60,y:-35}},
        1023:     { scale: 0.32, pos: 110, dir: 0, freq: 2700,skillList:[240001,240002,240003,240004,240005,240006,240007,240008],effect: { id: 202301, type: "shoot"  } ,desc:"作为精神领袖，召唤土、火、水、气四种元素协助盟友发挥最大威力。" ,atkPos :{x:60,y:-35}},
        1024:     { scale: 0.30, pos: 212, dir: 1, freq: 4000,skillList:[250001,250002,250003,250004,250005,250006,250007,250008],effect: { id: 202401, type: "shoot"  } ,desc:"血精灵牧师使用邪恶的暗影魔法彻底根除敌人，尤其擅长持续伤害法术。 " ,atkPos :{x:-60,y:-80}},
        1025:     { scale: 0.25, pos: 214, dir: 1, freq: 1100,skillList:[260001,260002,260003,260004,260005,260006,260007,260008],effect: { id: 202501, type: "shoot"  } ,desc:"杰出的侏儒发明家发明了先进的战争武器加入了正义的战团。" ,atkPos :{x:80,y:-50},isFly:true},
        1026:     { scale: 0.25, pos: 103, dir: 0, freq: 3600,skillList:[270001,270002,270003,270004,270005,270006,270007,270008],effect: { id: 202601, type: "shoot"  } ,desc:"法师手上汇聚的火球要把邪恶都烧成灰烬。" ,atkPos :{x:0,y:0}},
        1027:     { scale: 0.26, pos: 111, dir: 0, freq: 2600,skillList:[280001,280002,280003,280004,280005,280006,280007,280008],effect: { id: 202701, type: "shoot"  } ,desc:"为了重拾昔日的理想，德莱尼死骑重新拿起武器，对黑暗中的控制奋起抗争。" ,atkPos :{x:0,y:0}},
        1028:     { scale: 0.39, pos: 210, dir: 1, freq: 2200,skillList:[290001,290002,290003,290004,290005,290006,290007,290008],effect: { id: 202801, type: "shoot"  } ,desc:"为保护自然而战的牛头人战士能使用持续性治疗法术来维持盟友的生命。" ,atkPos :{x:-55,y:-90}},
        1029:     { scale: 0.20, pos: 113, dir: 0, freq: 2600,skillList:[300001,300002,300003,300004,300005,300006,300007,300008],effect: { id: 202901, type: "shoot"  } ,desc:"矮人虽然生得矮小，却是顽强的战士和灵敏的护卫。" ,atkPos :{x:35,y:-35}},//
        1030:     { scale: 0.24, pos: 108, dir: 0, freq: 2200,skillList:[310001,310002,310003,310004,310005,310006,310007,310008],effect: { id: 203001, type: "shoot"  } ,desc:"聪明的人类法师得到了操纵恶魔仆从的能力，令它们与自己并肩作战。" ,atkPos :{x:50,y:-90}},

        //精灵（仙女）
        9999:    { scale: 0.35, dir:0},

        //怪物
        10001:    { scale: 1.00, dir:0,  rect: [ 0, 160, 180, 100], color:1 },
        10002:    { scale: 1.00, dir:0,  rect: [ 0, 160, 180, 100], color:200 },
        10003:    { scale: 1.00, dir:0,  rect: [ 0, 80, 130, 100], color:1 },
        11003:    { scale: 1.00, dir:0,  rect: [ 0, 80, 130, 100], color:3 },
        12003:    { scale: 1.00, dir:0,  rect: [ 0, 80, 130, 100], color:2 },
        13003:    { scale: 1.00, dir:0,  rect: [ 0, 80, 130, 100], color:4 },
        10004:    { scale: 1.00, dir:0,  rect: [ 0, 155, 150, 200], color:1 },
        11004:    { scale: 1.00, dir:0,  rect: [ 0, 155, 150, 200], color:2 },
        12004:    { scale: 1.00, dir:0,  rect: [ 0, 155, 150, 200], color:3 },
        10005:    { scale: 1.00, dir:0,  rect: [ 0, 175, 160, 110], color:0 },
        10006:    { scale: 1.00, dir:0,  rect: [ 0, 155, 150, 170], color:0 },
        10007:    { scale: 1.00, dir:0,  rect: [ 0, 175, 135, 150], color:0 },
        10008:    { scale: 1.00, dir:0,  rect: [ 0, 130, 165, 150], color:0 },
        10009:    { scale: 1.00, dir:0,  rect: [ 0, 175, 150, 175], color:0 },
        10010:    { scale: 1.00, dir:0,  rect: [ 0, 125, 155, 165], color:1 },
        11010:    { scale: 1.00, dir:0,  rect: [ 0, 125, 155, 165], color:2 },
        12010:    { scale: 1.00, dir:0,  rect: [ 0, 125, 155, 165], color:3 },
        13010:    { scale: 1.00, dir:0,  rect: [ 0, 125, 155, 165], color:3 },
        10011:    { scale: 1.00, dir:0,  rect: [ 0, 160, 140, 200], color:0 },
        10012:    { scale: 1.00, dir:0,  rect: [ 0, 115, 120, 200], color:0 },
        10013:    { scale: 1.00, dir:0,  rect: [ 0, 140, 190, 150], color:0 },
        10014:    { scale: 1.00, dir:0,  rect: [ 0, 130, 90, 200], color:0},
        10015:    { scale: 1.00, dir:0,  rect: [ 0, 115, 180, 100], color:0},
        10016:    { scale: 1.00, dir:0,  rect: [ 0, 140, 180, 120], color:1},
        11016:    { scale: 1.00, dir:0,  rect: [ 0, 140, 180, 120], color:2},
        12016:    { scale: 1.00, dir:0,  rect: [ 0, 140, 180, 120], color:3},
        13016:    { scale: 1.00, dir:0,  rect: [ 0, 140, 180, 120], color:4},
        14016:    { scale: 1.00, dir:0,  rect: [ 0, 140, 180, 120], color:5},
        10017:    { scale: 1.00, dir:0,  rect: [ 0, 160, 150, 120], color:1},
        11017:    { scale: 1.00, dir:0,  rect: [ 0, 160, 150, 120], color:2},
        12017:    { scale: 1.00, dir:0,  rect: [ 0, 160, 150, 120], color:3},
        10018:    { scale: 1.00, dir:0,  rect: [ 0, 140, 180, 130], color:0},
        10019:    { scale: 1.00, dir:0,  rect: [ 0, 120, 175, 120], color:0},
        10020:    { scale: 1.00, dir:0,  rect: [ 0, 140, 150, 150], color:1},
        10021:    { scale: 0.70, dir:0,  rect: [ 0, 160, 215, 170], color:0},
        10022:    { scale: 1.00, dir:0,  rect: [ 0, 180, 150, 200], color:0}
    };

    Config.effects = {
        1001:     { scale: 0.38, sourceId: 1001,  name: "play01",  once: true },
        1002:     { scale: 0.38, sourceId: 1001,  name: "play02",  once: true },
        1003:     { scale: 0.38, sourceId: 1001,  name: "play03",  once: true },
        1004:     { scale: 0.38, sourceId: 1001,  name: "play04",  once: true },

        1005:     { scale: 0.38, sourceId: 1003,  name: "play03",  once: true },
        1006:     { scale: 0.38, sourceId: 1003,  name: "play01",  once: false },
        1007:     { scale: 0.38, sourceId: 1003,  name: "play02",  once: true },

        // 跳劈特效
        1008:     { scale: 0.38, sourceId: 1004,  name: "play01",  once: true },
        // 嗜血Buff
        1009:     { scale: 0.38, sourceId: 1007,  name: "play01",  once: false },
        1010:     { scale: 0.38, sourceId: 1007,  name: "play02",  once: false },
        // 巨龙怒吼
        1011:     { scale: 0.38, sourceId: 1006,  name: "play01",  once: false },
        1012:     { scale: 0.38, sourceId: 1006,  name: "play02",  once: false },

        1013:     { scale: 0.38, sourceId: 1008,  name: "play01",  once: false },
        1014:     { scale: 0.38, sourceId: 1008,  name: "play02",  once: false },

        /*******英雄特效*******/
        200101:   { scale: 0.35, sourceId: 20001, name: "play01",  once: true },
        
        200201:   { scale: 0.35, sourceId: 20002, name: "play01",  once: true },
        200202:   { scale: 0.35, sourceId: 20002, name: "play02",  once: false },
        200203:   { scale: 0.35, sourceId: 20002, name: "play03",  once: true },
        
        200301:   { scale: 0.35, sourceId: 20003, name: "play01",  once: true },
        
        200401:   { scale: 0.35, sourceId: 20004, name: "play01",  once: true },
        
        200501:   { scale: 0.35, sourceId: 20005, name: "play01",  once: true },
        200502:   { scale: 0.35, sourceId: 20005, name: "play02",  once: false },
        200503:   { scale: 0.35, sourceId: 20005, name: "play03",  once: true },

        200601:   { scale: 0.35, sourceId: 20006, name: "play01",  once: true },
        200602:   { scale: 0.35, sourceId: 20006, name: "play02",  once: false },
        200603:   { scale: 0.35, sourceId: 20006, name: "play03",  once: true },

        200701:   { scale: 0.35, sourceId: 20007, name: "play01",  once: true },

        200801:   { scale: 0.35, sourceId: 20008, name: "play01",  once: true },
        200802:   { scale: 0.35, sourceId: 20008, name: "play02",  once: false },
        200803:   { scale: 0.35, sourceId: 20008, name: "play03",  once: true },

        200902:   { scale: 0.35, sourceId: 20009, name: "play01",  once: false },
        200903:   { scale: 0.35, sourceId: 20009, name: "play02",  once: true },

        201001:   { scale: 0.35, sourceId: 20010, name: "play01",  once: true },

        201101:   { scale: 0.35, sourceId: 20011, name: "play01",  once: true },
        201102:   { scale: 0.35, sourceId: 20011, name: "play02",  once: false },
        201103:   { scale: 0.35, sourceId: 20011, name: "play03",  once: true },

        201202:   { scale: 0.35, sourceId: 20012, name: "play01",  once: false },
        201203:   { scale: 0.35, sourceId: 20012, name: "play02",  once: true },

        201301:   { scale: 0.35, sourceId: 20013, name: "play01",  once: true },
        201302:   { scale: 0.35, sourceId: 20013, name: "play02",  once: false },
        201303:   { scale: 0.35, sourceId: 20013, name: "play03",  once: true },

        201401:   { scale: 0.35, sourceId: 20014, name: "play01",  once: true },

        201502:   { scale: 0.35, sourceId: 20015, name: "play02",  once: false },
        201503:   { scale: 0.35, sourceId: 20015, name: "play03",  once: true },

        201601:   { scale: 0.35, sourceId: 20016, name: "play01",  once: true },
        201602:   { scale: 0.35, sourceId: 20016, name: "play02",  once: false },
        201603:   { scale: 0.35, sourceId: 20016, name: "play03",  once: true },

        201701:   { scale: 0.35, sourceId: 20017, name: "play01",  once: true },
        201702:   { scale: 0.35, sourceId: 20017, name: "play02",  once: false },
        201703:   { scale: 0.35, sourceId: 20017, name: "play03",  once: true },

        201801:   { scale: 0.35, sourceId: 20018, name: "play01",  once: true },
        201802:   { scale: 0.35, sourceId: 20018, name: "play02",  once: false },
        201803:   { scale: 0.35, sourceId: 20018, name: "play03",  once: true },

        201901:   { scale: 0.35, sourceId: 20019, name: "play01",  once: true },

        202001:   { scale: 0.35, sourceId: 20020, name: "play01",  once: true },

        202102:   { scale: 0.35, sourceId: 20021, name: "play01",  once: false },
        202103:   { scale: 0.35, sourceId: 20021, name: "play02",  once: true },

        202202:   { scale: 0.35, sourceId: 20022, name: "play01",  once: false },
        202203:   { scale: 0.35, sourceId: 20022, name: "play02",  once: true },

        202301:   { scale: 0.35, sourceId: 20023, name: "play01",  once: true },
        202302:   { scale: 0.35, sourceId: 20023, name: "play02",  once: false },
        202303:   { scale: 0.35, sourceId: 20023, name: "play03",  once: true },

        202401:   { scale: 0.35, sourceId: 20024, name: "play01",  once: true },
        202402:   { scale: 0.35, sourceId: 20024, name: "play02",  once: false },
        202403:   { scale: 0.35, sourceId: 20024, name: "play03",  once: true },

        202502:   { scale: 0.35, sourceId: 20025, name: "play01",  once: false },
        202503:   { scale: 0.35, sourceId: 20025, name: "play02",  once: true },

        202601:   { scale: 0.35, sourceId: 20026, name: "play01",  once: true },
        202602:   { scale: 0.35, sourceId: 20026, name: "play02",  once: true },
        202603:   { scale: 0.35, sourceId: 20026, name: "play03",  once: true },

        202701:   { scale: 0.35, sourceId: 20027, name: "play01",  once: true },
        202702:   { scale: 0.35, sourceId: 20027, name: "play01",  once: false },
        202703:   { scale: 0.35, sourceId: 20027, name: "play02",  once: true },

        202801:   { scale: 0.35, sourceId: 20028, name: "play01",  once: true },
        202802:   { scale: 0.35, sourceId: 20028, name: "play02",  once: false },
        202803:   { scale: 0.35, sourceId: 20028, name: "play03",  once: true },

        //202901:   { scale: 0.35, sourceId: 20029, name: "play01",  once: true },
        202902:   { scale: 0.35, sourceId: 20029, name: "play02",  once: false },
        202903:   { scale: 0.35, sourceId: 20029, name: "play03",  once: true },

        203001:   { scale: 0.35, sourceId: 20030, name: "play01",  once: true },
        203002:   { scale: 0.35, sourceId: 20030, name: "play02",  once: false },
        203003:   { scale: 0.35, sourceId: 20030, name: "play03",  once: true },
        /*******英雄特效*******/

        /*******其他特效*******/
        300001:   { scale: 2.5, sourceId: 30001, name: "play01",  once: true },     //怪物死亡特效
        300002:   { scale: 0.5, sourceId: 30002, name: "play01",  once: true },
        300006:   { scale: 0.8, sourceId: 30006, name: "play01",  once: false },    //秒杀按钮
        300010:   { scale: 1  , sourceId: 30010, name: "play01",  once: false },    //新手礼包
        300011:   { scale: 1  , sourceId: 30011, name: "play01",  once: false },    //转生礼包
        300012:   { scale: 1  , sourceId: 30012, name: "play01",  once: false },    //限时礼包
        300013:   { scale: 1  , sourceId: 30013, name: "play01",  once: false },    //畅玩礼包
        300014:   { scale: 1  , sourceId: 30014, name: "play01",  once: false },    //荣誉礼包
        300015:   { scale: 1  , sourceId: 30015, name: "play01",  once: false },    //离线金币
        300016:   { scale: 1  , sourceId: 30016, name: "play01",  once: true },     //闪电
        300017:   { scale: 1  , sourceId: 30017, name: "play01",  once: true },     //闪电击中
        300018:   { scale: 1  , sourceId: 30018, name: "play01",  once: false },    //礼包按钮特效
        300019:   { scale: 1  , sourceId: 30019, name: "play01",  once: false },    //商城按钮特效
        300020:   { scale: 1  , sourceId: 30013, name: "play02",  once: false },    //蛋刀特效
        300021:   { scale: 1  , sourceId: 30014, name: "play02",  once: false },    //蛋盾特效
        300022:   { scale: 1  , sourceId: 30020, name: "play01",  once: false },    //秒杀礼包
        300031:   { scale: 0.5, sourceId: 30003, name: "play01",  once: true },     //英雄出现
        300032:   { scale: 0.5, sourceId: 30003, name: "play02",  once: true },     //英雄升级
        300033:   { scale: 0.5, sourceId: 30003, name: "play03",  once: true },     //英雄升级光圈
        300041:   { scale: 0.5, sourceId: 30004, name: "play01",  once: true },     //界面升级
        300051:   { scale: 1  , sourceId: 30005, name: "play01",  once: true },     //圣器获得
        300052:   { scale: 1  , sourceId: 30005, name: "play02",  once: false },    //圣器获得循环
        300053:   { scale: 1  , sourceId: 30021, name: "play01",  once: true },     //离线特效
        300054:   { scale: 0.9, sourceId: 30022, name: "play01",  once: false },    //礼包界面特效
        300055:   { scale: 1  , sourceId: 30023, name: "play01",  once: false },    //新手礼包(应用宝)
        300056:   { scale: 1  , sourceId: 30024, name: "play01",  once: false },    //比赛礼包
        300057:   { scale: 1  , sourceId: 30025, name:"animation",once: true },     //升星特效
        300058:   { scale: 1  , sourceId: 30026, name: "play01",  once: false },    //练级礼包
        /*******其他特效*******/

        /*******怪物死亡墓碑特效*******/
        900001:   { scale: 0.5, sourceId: 99999, name: "idle",  once: false },
        900002:   { scale: 0.5, sourceId: 99999, name: "flyidle",  once: false },
    };
























































    Config.Skill = {
           10001:{"id":"10001","name":"战士狂怒"},
           10002:{"id":"10002","name":"旋风斩"},
           10003:{"id":"10003","name":"嗜血斩击"},
           10004:{"id":"10004","name":"冲锋号角"},
           10005:{"id":"10005","name":"巨龙怒吼"},
           10006:{"id":"10006","name":"黄金风暴"},
           10007:{"id":"10007","name":"进化"},
           20001:{"id":"20001","name":"贯日击"},
           20002:{"id":"20002","name":"幻灭踢"},
           20003:{"id":"20003","name":"嚎镇八方"},
           20004:{"id":"20004","name":"白虎传承"},
           20005:{"id":"20005","name":"势如破竹"},
           20006:{"id":"20006","name":"金钟罩"},
           20007:{"id":"20007","name":"力贯千钧"},
           20008:{"id":"20008",},
           30001:{"id":"30001","name":"猎人精神"},
           30002:{"id":"30002","name":"瞄准射击"},
           30003:{"id":"30003","name":"精确瞄准"},
           30004:{"id":"30004","name":"专注射击"},
           30005:{"id":"30005","name":"强击光环"},
           30006:{"id":"30006","name":"黄金飞弹"},
           30007:{"id":"30007","name":"杀戮轰炸"},
           30008:{"id":"30008",},
           40001:{"id":"40001","name":"身经百战"},
           40002:{"id":"40002","name":"雷霆打击"},
           40003:{"id":"40003","name":"纳鲁的赐福"},
           40004:{"id":"40004","name":"巨人打击"},
           40005:{"id":"40005","name":"雷霆猛击"},
           40006:{"id":"40006","name":"英姿勃发"},
           40007:{"id":"40007","name":"纳鲁的秘宝"},
           40008:{"id":"40008",},
           50001:{"id":"50001","name":"萨满妖术"},
           50002:{"id":"50002","name":"黄金图腾"},
           50003:{"id":"50003","name":"先祖之魂"},
           50004:{"id":"50004","name":"净化术"},
           50005:{"id":"50005","name":"金之召唤"},
           50006:{"id":"50006","name":"血之祭祀"},
           50007:{"id":"50007","name":"根源打击"},
           50008:{"id":"50008",},
           60001:{"id":"60001","name":"召唤小鬼"},
           60002:{"id":"60002","name":"克萨雷斯魔典"},
           60003:{"id":"60003","name":"虚空行者召唤术"},
           60004:{"id":"60004","name":"末日守卫召唤术"},
           60005:{"id":"60005","name":"召唤地狱火"},
           60006:{"id":"60006","name":"恶魔掌控"},
           60007:{"id":"60007","name":"召唤恶魔法阵"},
           60008:{"id":"60008",},
           70001:{"id":"70001","name":"毒蛇之箭"},
           70002:{"id":"70002","name":"野兽劈斩"},
           70003:{"id":"70003","name":"猛兽劈斩"},
           70004:{"id":"70004","name":"怒火之箭"},
           70005:{"id":"70005","name":"月神恩赐"},
           70006:{"id":"70006","name":"黄金箭"},
           70007:{"id":"70007","name":"月神召唤"},
           70008:{"id":"70008",},
           80001:{"id":"80001","name":"影袭"},
           80002:{"id":"80002","name":"迅刃之黠 "},
           80003:{"id":"80003","name":"毒刃  "},
           80004:{"id":"80004","name":"暗里藏金"},
           80005:{"id":"80005","name":"秘宝之钥"},
           80006:{"id":"80006","name":"命运解封"},
           80007:{"id":"80007","name":"毒物大师"},
           80008:{"id":"80008",},
           90001:{"id":"90001","name":"火焰冲击"},
           90002:{"id":"90002","name":"魔法增效"},
           90003:{"id":"90003","name":"奥术光辉"},
           90004:{"id":"90004","name":"魔爆术"},
           90005:{"id":"90005","name":"奥术充能"},
           90006:{"id":"90006","name":"奥术强化"},
           90007:{"id":"90007","name":"奥术心法"},
           90008:{"id":"90008",},
           100001:{"id":"100001","name":"破坏者"},
           100002:{"id":"100002","name":"英勇打击"},
           100003:{"id":"100003","name":"嘲讽"},
           100004:{"id":"100004","name":"魔王秘宝"},
           100005:{"id":"100005","name":"黄金旋风"},
           100006:{"id":"100006","name":"神之秘宝"},
           100007:{"id":"100007","name":"战士怒吼"},
           100008:{"id":"100008",},
           110001:{"id":"110001","name":"女神之怒"},
           110002:{"id":"110002","name":"神牛月火术"},
           110003:{"id":"110003","name":"阳炎术"},
           110004:{"id":"110004","name":"神牛痛击"},
           110005:{"id":"110005","name":"女神赏赐"},
           110006:{"id":"110006","name":"原始狂怒"},
           110007:{"id":"110007","name":"超凡之神"},
           110008:{"id":"110008",},
           120001:{"id":"120001","name":"稳固射击"},
           120002:{"id":"120002","name":"多重射击"},
           120003:{"id":"120003","name":"巫毒之矢"},
           120004:{"id":"120004","name":"爆裂之矢"},
           120005:{"id":"120005","name":"翼龙钉刺"},
           120006:{"id":"120006","name":"狂暴箭矢"},
           120007:{"id":"120007","name":"黄金打击"},
           120008:{"id":"120008",},
           130001:{"id":"130001","name":"亡灵召唤"},
           130002:{"id":"130002","name":"亡灵的恐惧"},
           130003:{"id":"130003","name":"灵魂腐蚀"},
           130004:{"id":"130004","name":"遗忘者的意志"},
           130005:{"id":"130005","name":"遗忘者之怨"},
           130006:{"id":"130006","name":"地狱传唤"},
           130007:{"id":"130007","name":"魅魔之吻"},
           130008:{"id":"130008",},
           140001:{"id":"140001","name":"枭兽形态"},
           140002:{"id":"140002","name":"自然的力量"},
           140003:{"id":"140003","name":"夺魂咆哮"},
           140004:{"id":"140004","name":"日月之蚀"},
           140005:{"id":"140005","name":"伊瑟拉之赐"},
           140006:{"id":"140006","name":"蛮力猛击"},
           140007:{"id":"140007","name":"大自然之赏赐"},
           140008:{"id":"140008",},
           150001:{"id":"150001","name":"十字军打击"},
           150002:{"id":"150002","name":"正义之怒"},
           150003:{"id":"150003","name":"圣光"},
           150004:{"id":"150004","name":"荣耀圣令"},
           150005:{"id":"150005","name":"救赎"},
           150006:{"id":"150006","name":"十字军宝藏"},
           150007:{"id":"150007","name":"不败之魂"},
           150008:{"id":"150008",},
           160001:{"id":"160001","name":"要害打击"},
           160002:{"id":"160002","name":"财富预感"},
           160003:{"id":"160003","name":"佣金救赎"},
           160004:{"id":"160004","name":"刺客无情"},
           160005:{"id":"160005","name":"死亡标记"},
           160006:{"id":"160006","name":"剑刃乱舞"},
           160007:{"id":"160007","name":"致命投掷"},
           160008:{"id":"160008",},
           170001:{"id":"170001","name":"疫病使者"},
           170002:{"id":"170002","name":"符文打击"},
           170003:{"id":"170003","name":"天灾契约"},
           170004:{"id":"170004","name":"符文强化"},
           170005:{"id":"170005","name":"幽冥之力"},
           170006:{"id":"170006","name":"赤色天灾"},
           170007:{"id":"170007","name":"黄金符文"},
           170008:{"id":"170008",},
           180001:{"id":"180001","name":"亡灵惩击"},
           180002:{"id":"180002","name":"暗影魔"},
           180003:{"id":"180003","name":"天使壁垒"},
           180004:{"id":"180004","name":"摧心魔"},
           180005:{"id":"180005","name":"吸血鬼之触"},
           180006:{"id":"180006","name":"吸血鬼宝藏"},
           180007:{"id":"180007","name":"圣光统御"},
           180008:{"id":"180008",},
           190001:{"id":"190001","name":"暗影巫术"},
           190002:{"id":"190002","name":"精神灼烧"},
           190003:{"id":"190003","name":"恐惧结界"},
           190004:{"id":"190004","name":"魔力驱散"},
           190005:{"id":"190005","name":"幽灵召唤"},
           190006:{"id":"190006","name":"丛林秘宝"},
           190007:{"id":"190007","name":"噬灵"},
           190008:{"id":"190008",},
           200001:{"id":"200001","name":"撕裂"},
           200002:{"id":"200002","name":"斩杀"},
           200003:{"id":"200003","name":"破城者之击"},
           200004:{"id":"200004","name":"横扫攻击"},
           200005:{"id":"200005","name":"正义捍卫"},
           200006:{"id":"200006","name":"主宰"},
           200007:{"id":"200007","name":"黄金反射"},
           200008:{"id":"200008",},
           210001:{"id":"210001","name":"制裁之剑"},
           210002:{"id":"210002","name":"纯净之手"},
           210003:{"id":"210003","name":"不败之魂"},
           210004:{"id":"210004","name":"强化圣印"},
           210005:{"id":"210005","name":"永恒之火"},
           210006:{"id":"210006","name":"黄金裁决"},
           210007:{"id":"210007","name":"圣骑的愤怒"},
           210008:{"id":"210008",},
           220001:{"id":"220001","name":"正义之剑"},
           220002:{"id":"220002","name":"巨熊打击"},
           220003:{"id":"220003","name":"正义之神"},
           220004:{"id":"220004","name":"再度冲锋"},
           220005:{"id":"220005","name":"胜利在望"},
           220006:{"id":"220006","name":"震荡波"},
           220007:{"id":"220007","name":"强力反击"},
           220008:{"id":"220008",},
           230001:{"id":"230001","name":"扳手攻击"},
           230002:{"id":"230002","name":"螺母风暴"},
           230003:{"id":"230003","name":"战争机器"},
           230004:{"id":"230004","name":"机械重击"},
           230005:{"id":"230005","name":"金属打击"},
           230006:{"id":"230006","name":"爆炸螺母"},
           230007:{"id":"230007","name":"军火专家"},
           230008:{"id":"230008",},
           240001:{"id":"240001","name":"风行图腾"},
           240002:{"id":"240002","name":"土遁图腾"},
           240003:{"id":"240003","name":"烈火图腾"},
           240004:{"id":"240004","name":"先祖恩赐"},
           240005:{"id":"240005","name":"黄金升腾"},
           240006:{"id":"240006","name":"石壁图腾"},
           240007:{"id":"240007","name":"元素回响"},
           240008:{"id":"240008",},
           250001:{"id":"250001","name":"吸血鬼之手"},
           250002:{"id":"250002","name":"法力神指"},
           250003:{"id":"250003","name":"暗影之力"},
           250004:{"id":"250004","name":"能量灌注"},
           250005:{"id":"250005","name":"黄金光晕"},
           250006:{"id":"250006","name":"疫病之触"},
           250007:{"id":"250007","name":"灭之术"},
           250008:{"id":"250008",},
           260001:{"id":"260001","name":"机枪扫射"},
           260002:{"id":"260002","name":"狂野扫射"},
           260003:{"id":"260003","name":"步步紧逼"},
           260004:{"id":"260004","name":"魔王导弹"},
           260005:{"id":"260005","name":"机械防护"},
           260006:{"id":"260006","name":"激光飞弹"},
           260007:{"id":"260007","name":"狂金滥炸"},
           260008:{"id":"260008",},
           270001:{"id":"270001","name":"火之奥术"},
           270002:{"id":"270002","name":"烈焰焚烧"},
           270003:{"id":"270003","name":"能量符文"},
           270004:{"id":"270004","name":"魔法烈焰"},
           270005:{"id":"270005","name":"烈焰攻击"},
           270006:{"id":"270006","name":"烈焰风暴"},
           270007:{"id":"270007","name":"焚金术"},
           270008:{"id":"270008",},
           280001:{"id":"280001","name":"符文攻击"},
           280002:{"id":"280002","name":"符文强化"},
           280003:{"id":"280003","name":"邪恶符文"},
           280004:{"id":"280004","name":"符能转换"},
           280005:{"id":"280005","name":"恶魔之息"},
           280006:{"id":"280006","name":"反魔法领域"},
           280007:{"id":"280007","name":"炼狱之击"},
           280008:{"id":"280008",},
           290001:{"id":"290001","name":"苏索尔旋风"},
           290002:{"id":"290002","name":"自然之力"},
           290003:{"id":"290003","name":"黄金萌芽"},
           290004:{"id":"290004","name":"自然的守护"},
           290005:{"id":"290005","name":"快速生长"},
           290006:{"id":"290006","name":"台风突袭"},
           290007:{"id":"290007","name":"黄金藤蔓"},
           290008:{"id":"290008",},
           300001:{"id":"300001","name":"疾风之箭"},
           300002:{"id":"300002","name":"箭雨"},
           300003:{"id":"300003","name":"灵魂之盟"},
           300004:{"id":"300004","name":"黄金宝藏"},
           300005:{"id":"300005","name":"铁鹰守护"},
           300006:{"id":"300006","name":"险境求生"},
           300007:{"id":"300007","name":"卧虎藏龙"},
           300008:{"id":"300008",},
           310001:{"id":"310001","name":"灵魂之火"},
           310002:{"id":"310002","name":"恶魔飞跃"},
           310003:{"id":"310003","name":"地狱烈焰"},
           310004:{"id":"310004","name":"夺命之术"},
           310005:{"id":"310005","name":"生命的宝藏"},
           310006:{"id":"310006","name":"熔火之术"},
           310007:{"id":"310007","name":"金币飞舞"},
           310008:{"id":"310008",},
    };


    //将数值转换成 K M T B aa 等文字显示格式
    Config.formatNumber = function(num) {
        var count = 0;
        while(num >= 1000)
        {
            num /= 1000;
            count++;
        }
        num = +(num).toFixed(2);

        var exp = "E+" + count*3;
        if(count < 31)
        {
            if(count == 0) {
                exp = "";
            } else if(count == 1) {
                exp = "K";
            } else if(count == 2) {
                exp = "M";
            } else if(count == 3) {
                exp = "B";
            } else if(count == 4) {
                exp = "T";
            } else {
                exp = String.fromCharCode(97 + count - 5) + String.fromCharCode(97 + count - 5);
            }
        }

        return num + exp
    };

    //将aa B T K 等显示方式转换成数值
    Config.formatString = function (str) {
        var lastStrCode = str.substr(-1,1).charCodeAt(0);
        var tmp = 0;
        var count = 0;

        if (lastStrCode >= 48 && lastStrCode <= 57) {
            return +(str);
        }
        //aa..zz
        if (lastStrCode >= 97 && lastStrCode <= 122)
        {
            count = lastStrCode - 97 + 5;
            tmp = str.substr(0, str.length - 2);
        }
        else if (lastStrCode == 75)
        {
            count = 1;
            tmp = str.substr(0, str.length - 1);
        }
        else if (lastStrCode == 77)
        {
            count = 2;
            tmp = str.substr(0, str.length - 1);
        }
        else if (lastStrCode == 66)
        {
            count = 3;
            tmp = str.substr(0, str.length - 1);
        }
        else if (lastStrCode == 84)
        {
            count = 4;
            tmp = str.substr(0, str.length - 1);
        }
        else
        {
            return 0;
        }

        count *= 3;
        tmp = +(tmp);
        return tmp * Math.pow(10, count);
    };

    //将秒数转换成 时:分:秒 形式
    Config.formatSecondToHHMMSS = function(second) {
        var hour = 0;
        var minute = 0;
        if (second >= 3600) {
            hour = Math.floor(second/3600);
            second -= (hour * 3600);
        }
        if (second >= 60) {
            minute = Math.floor(second/60);
            second -= (minute * 60);
        }
        var showHour = "";
        if (hour < 10) {
            showHour = "0" + hour;
        }
        else {
            showHour = hour.toString();
        }

        var showMinute = "";
        if (minute < 10) {
            showMinute = "0" + minute;
        }
        else {
            showMinute = minute.toString();
        }

        var showSecond = "";
        if (second < 10) {
            showSecond = "0" + second;
        }
        else {
            showSecond = second.toString();
        }
        return showHour + ":" + showMinute + ":" + showSecond;
    };

    //将秒数转换成 时:分:秒 形式(中文模式)
    Config.formatSecondToChineseHHMMSS = function(second) {
        var hour = 0;
        var minute = 0;
        if (second >= 3600) {
            hour = Math.floor(second/3600);
            second -= (hour * 3600);
        }
        if (second >= 60) {
            minute = Math.floor(second/60);
            second -= (minute * 60);
        }
        var showHour = "";
        if (hour <= 0) {
            showHour = "";
        }
        else {
            showHour = hour.toString() + "小时";
        }

        var showMinute = "";
        if (minute <= 0) {
            showMinute = "" ;
        }
        else {
            showMinute = minute.toString() + "分";
        }

        var showSecond = "";
        if (second  <= 0) {
            showSecond = "";
        }
        else {
            showSecond = second.toString() + "秒";
        }
        return showHour  + showMinute + showSecond;
    };
}(Narwhale));






























