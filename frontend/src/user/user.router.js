const express = require("express");
const userRouter = express.Router();
const { userController } = require("./user.controller");

const getLogin = userController;
const getSignup = userController;
const postSignup = userController;
const getProfile = userController;
const postProfile = userController;
const getLogout = userController;

userRouter.get("/", getSignup);
userRouter.post("/", postSignup);
userRouter.get("/:provider", getLogin);
userRouter.get("/logout", getLogout);
userRouter.get("/profile", getProfile);
userRouter.post("/profile", postProfile);

module.exports = userRouter;
