const Sequelize = require("sequelize");

require("dotenv").config();
const db = {};

const config = {
    host: process.env["DB_HOST"],
    port: process.env["DB_PORT"],
    dialect: "mysql",
};

const sequelize = new Sequelize(
    process.env["DB_DATABASE"],
    process.env["DB_USERNAME"],
    process.env["DB_PASSWORD"],
    config
);

const entityList = [
    `../user/user`,
    `../user/role`,
    `../board/model/board`,
    `../comment/comment`,
    `../board/model/likes`,
];

entityList.forEach((entity, index) => {
    const model = require(entityList[index])(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
