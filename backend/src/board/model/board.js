module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Boards",
        {
            Board_uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            Board_title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            Board_content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Board_writer: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            Board_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("now()"),
            },
            Board_hit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            Board_like: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
