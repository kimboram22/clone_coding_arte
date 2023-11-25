const express = require("express");
const app = express();
// const router = require("./src/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { auth } = require("./src/lib/jwtAuthMiddleware");

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
app.use(
    cors({
        origin: allowedOrigins,
        methods: "GET,POST,OPTIONS,PUT,DELETE,UPDATE",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("backend/uploads"));

app.use(cookieParser());
// app.use(auth);
// app.use(router);

app.use((error, req, res, next) => {
    console.log(`back error :`, error);
});

module.exports = app;
