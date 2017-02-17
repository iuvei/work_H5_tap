
module.exports = function(sequelize, DataTypes) {
    var Platform = sequelize.define(
        // modelName
        'platform',

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
            sdk: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            authURL: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            orderURL: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            payCallbackURL: {
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

    return Platform;
};
