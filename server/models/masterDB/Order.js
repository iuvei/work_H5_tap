
module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define(
        // modelName
        'order',

        // attributes
        {
            orderID: {
                type: DataTypes.STRING(36),
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            shortID: {
                type: DataTypes.STRING(36),
                allowNull: false
            },
            appID: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            platformID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            channelID: {
                type: DataTypes.STRING(36),
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            channelOrderID: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            currency: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            extension: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            money: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            realMoney: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            roleID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            serverID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            serverName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            createTime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            sdkOrderTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            completeTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            productID: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productDesc: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            notifyUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            }
        },

        // options
        {
            timestamps: true,
            createAt: "createTime"
        }
    );

    return Order;
};
