var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var passport = require("passport");
var busboy = require('connect-busboy');
module.exports = function(app, config) {
    app.set('view engine', 'html');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(busboy({immediate: false}));
    app.use(express.static(config.rootPath + "/public"));
    app.use(cookieParser());


    app.use(expressSession({
        secret: "magic unicorns",
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};
