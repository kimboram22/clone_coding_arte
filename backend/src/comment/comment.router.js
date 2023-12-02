const express = require("express");
const commentRouter = express.Router();

const { commentController } = require("./comment.module");
const getComments = commentController.getComments.bind(commentController);
const postComments = commentController.postComments.bind(commentController);

commentRouter.get("/", getComments);
commentRouter.post("/", postComments);

module.exports = commentRouter;
