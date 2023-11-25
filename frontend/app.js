const express = require("express");
const app = express();
const router = require("./src/index");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
// const { auth } = require("./src/lib/jwtAuthMiddelware");

app.set("view engine", "html");
nunjucks.configure("frontend/views", { express: app });

app.use(express.static("frontend/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(auth);

app.use(router);
app.use((error, req, res, next) => {
    console.log(`front error :`, error);
});

module.exports = app;
