const express = require("express");
const userRouter = express.Router();
const upload = require("../lib/upload");
const { userController } = require("./user.module");

const postSignup = userController.postSignup.bind(userController);
const login = userController.login.bind(userController);
const postProfile = userController.postProfile.bind(userController);
const putProfile = userController.putProfile.bind(userController);

userRouter.post("/", postSignup);
userRouter.post("/profile", upload.single("profile"), postProfile);
userRouter.put("/profile", putProfile);
userRouter.get("/:provider", login);
userRouter.post("/:providr", login);

module.exports = userRouter;
