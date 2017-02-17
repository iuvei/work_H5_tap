
module.exports = function(sequelize, DataTypes) {
    var Config = sequelize.define(
        // modelName
        'config',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
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
            version: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            environment: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            priority: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            config: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: ""
            }
        },

        // options
        {
            timestamps: false,
            getterMethods: {
                major: function() { return this.version.split('.')[0]; },
                minor: function() { return this.version.split('.')[1]; },
                patch: function() { return this.version.split('.')[2]; },
                revision: function() { return this.version.split('.')[3]; }

            }
        }
    );

    return Config;
};
