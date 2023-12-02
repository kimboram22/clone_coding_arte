module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Users",
        {
            Users_uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            Users_suid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Users_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Users_password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Users_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Users_nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Users_provider: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Users_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("now()"),
            },
            Users_email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Users_profile: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Role_authority: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: "user",
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
