
module.exports = function(sequelize, DataTypes) {
    var Version = sequelize.define(
        // modelName
        'version',

        // attributes
        {
            appID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            channelID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                primaryKey: true
            },
            environment: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            version: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "1.0.0"
            },
            resource: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "1.0.0.0"
            }
        },

        // options
        {
            timestamps: false
        }
    );

    return Version;
};

