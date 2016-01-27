var mongoose = require('mongoose');
var User = require('../models/User'),
    Message = require('../models/Message');
module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once("open", function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("db running");
    });
    db.on("error", function(err) {
        console.log(err);

    });
};