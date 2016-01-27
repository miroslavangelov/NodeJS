var mongoose = require("mongoose");
var user = require("../models/user");

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once("open", function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("db running fucker");
    });
    db.on("error", function(err) {
        console.log(err);

    });
    user.seedInitialUsers();
};