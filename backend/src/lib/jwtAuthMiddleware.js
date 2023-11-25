const JWT = require("./jwt");
const jwt = new JWT();
const db = require("./db");

const UserService = require("../user/user.service");
const { Users } = db;
const userService = new UserService(Users);

exports.auth = async (req, res, next) => {
    try {
    } catch (e) {
        next(e);
    }
};

const header = async (req, res, next) => {
    try {
    } catch (e) {
        next(e);
    }
};

const cookie = async (req, res, next) => {
    try {
    } catch (e) {
        next(e);
    }
};
