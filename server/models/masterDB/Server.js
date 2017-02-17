
module.exports = function(sequelize, DataTypes) {
    var Server = sequelize.define(
        // modelName
        'server',

        // attributes
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            appID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            serverID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            environment: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            serverName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            service: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            port: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },

        // options
        {
            timestamps: false
        }
    );

    return Server;
};

