
module.exports = function(sequelize, DataTypes) {
    var Channel = sequelize.define(
        // modelName
        'channel',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },

            appID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            platformID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            enablePay: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: 1
            },
            cpAppID: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            cpAppKey: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            cpAppSecret: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            cpID: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            cpPayID: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            cpPayKey: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            cpConfig: {
                type: DataTypes.STRING(2048),
                allowNull: true
            },
            authUrl: {
                type: DataTypes.STRING(1024),
                allowNull: true
            },
            payCallbackUrl: {
                type: DataTypes.STRING(1024),
                allowNull: true
            },
            orderUrl: {
                type: DataTypes.STRING(1024),
                allowNull: true
            },
            verifyClass: {
                type: DataTypes.STRING(1024),
                allowNull: true
            }
        },

        // options
        {
            timestamps: false
        }
    );

    return Channel;
};
