var express = require("express");
var bodyParser = require("body-parser");
var stylus = require("stylus");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var passport = require("passport");
module.exports = function(app, config) {
    app.set("view engine", "jade");
    app.set("views", config.rootPath + "/server/views");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(config.rootPath + "/public"));
    app.use(cookieParser());


    app.use(expressSession({
        secret: "magic unicorns",
        resave: true,
        saveUninitialized: true
    }));
    app.use(stylus.middleware(
        {
            src: config.rootPath  + "/public",
            compile: function(str, path) {
                return stylus(str).set("filename", path);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
};
