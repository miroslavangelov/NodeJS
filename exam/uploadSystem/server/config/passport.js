var passport = require("passport");
var localPassport = require("passport-local");
var User = require("mongoose").model("User");


module.exports = function() {
    passport.use(new localPassport(function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
           // console.log(user)
            if(err) {
                console.log("Error loading user: " + err);
                return;
            }
            if(user && user.authenticate(password)) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: "Invalid password/user"});
            }
        });
    }));
    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });
    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if(err) {
                console.log("Error loading user: " + err);
                return;
            }
            if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
};

