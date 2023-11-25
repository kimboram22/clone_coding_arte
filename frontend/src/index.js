const express = require("express");
const router = express.Router();
const boardRouter = require("./board/board.router");
// const userRouter = require("./user/user.router");
// const adminRouter = require("./admin/admin.router");
// const chatRouter = require('./chat/chat.router')

router.use("/", boardRouter);
// router.use("/users", userRouter);
// router.use("/admin", adminRouter);
// router.use('/chat', chatRouter)

module.exports = router;
