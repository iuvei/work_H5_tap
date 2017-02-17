(function(root) {
    root.Code = {
        OK: 200,
        FAILED: 500,
        TIMEOUT: 1000,

        MySQL: {
            DB_ERROR: 1001,
            RECORD_ERROR: 1002,
            PROCEDURE_ERROR: 1003
        },

        REDIS: {
            REDIS_ERROR: 1101
        },

        HTTP: {
            REQUEST_ERROR: 1201,
            STATUS_ERROR: 1202,
            BODY_ERROR: 1203
        },

        GAME_ERR: {
            NOT_ENOUGH_GOLD:        10001,      //金币不足
            HERO_ID_ERR:            10002,      //英雄ID错误
            WRONG_SKILL:            10003,      //没有这个技能
            ALREADY_LEARN:          10004,      //已经学习了
            NOT_ENOUGH_LEVEL:       10005,      //等级不足
            SKILL_IS_ON_CD:         10006,      //技能正在cd
            CANT_EVOLUTION:         10007,      //未满足转生条件
            NOT_ENOUGH_RELIC:       10008,      //荣誉不足
            NOT_ENOUGH_DIAMOND:     10009,      //钻石不足
            NO_ARTIFACT_BUY:        10010,      //暂时没有新神器可购买
            NOT_ARTIFACT:           10011,      //还未获得此神器
            ARTIFACT_LEVEL_MAX:     10012,      //神器已达最高级
            ARTIFACT_NOT_FOR_SALE:  10013,      //该神器无法出售
            HERO_CANT_REVIVED:      10014,      //英雄无需复活 一般是没有邀请到的英雄或者没有死亡的英雄
            ITEM_IS_ON_CD:          10015,      //道具正在cd
            NO_ERR:                 null        //没有错误 一般不用
        },

        AUTH: {

        },

        REQUEST: {
            INVALID_PARAMS: 1500,
            INVALID_SIGNATURE: 1501,
            UNZIP_ERROR: 1502,
            JSON_ERROR: 1503,
            TOKEN_ERROR: 1504,
            SDK_ERROR: 1505,
            DATA_ERROR: 1506,
            INVALID_PLATFORM: 1507,
            INVALID_SERVER: 1508,
            INTERNAL_ERROR: 1509
        }
    };
}(hGame006));