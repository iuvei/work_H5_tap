
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        // modelName
        'user',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            uuid: {
                type: DataTypes.STRING(36),
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            token: {
                type: DataTypes.STRING(36),
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            udid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            appID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            channelID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            channelUserID: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            channelUserName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            channelUserNick: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            }
        },

        // options
        {
            timestamps: true
        }
    );

    return User;
};
