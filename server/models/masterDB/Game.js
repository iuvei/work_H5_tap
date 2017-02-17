
module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define(
        // modelName
        'game',

        // attributes
        {
            appID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            appKey: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            appSecret: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            }
        },

        // options
        {
            timestamps: false
        }
    );

    return Game;
};

