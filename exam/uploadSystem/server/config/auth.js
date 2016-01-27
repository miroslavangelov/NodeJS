var passport = require("passport");
var encryption = require("../models/encryption");
var User = require("mongoose").model("User");
module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false})
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send({success: true, user: user});
            })
        });
        auth(req, res, next);
    },
    register: function(req, res, next) {
        var newUserData = req.body;

        if (newUserData.username === '' || !newUserData.username) {
            res.status(400);
            return res.send({err: "Username should not be empty"});
        }
        if (newUserData.password === '' || !newUserData.password) {
            res.status(400);
            return res.send({err: "Password should not be empty"});
        }
        if (newUserData.username.length < 6 || newUserData.username.length > 20) {
            res.status(400);
            return res.send({err: "Username length should be between 6 and 20 characters"});
        }

        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(error, user) {
            if (error) {
                console.log("Failed to register new user" + error);
                res.status(400);
                return res.send({err: "Username already exists"});
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()})
                }
                res.send({success: true, user: user});
            })
        });
    },
    editProfile: function(req, res, next) {
        if (req.body.username === '' || !req.body.username) {
            res.status(400);
            return res.send({err: "Username should not be empty"});
        }

        if (req.body._id == req.user._id) {
            var editedUserData = req.body;
            if (editedUserData.password && editedUserData.password.length > 0) {
                editedUserData.salt = encryption.generateSalt();
                editedUserData.hashPass = encryption.generateHashedPassword(editedUserData.salt, editedUserData.password);
            }
            User.update({_id: req.body._id}, editedUserData, function() {
                res.end();
            });
        }
    },
    getUserProfile: function(req, res, next) {
        User.findOne({_id: req.user._id})
            .exec(function(error, user) {
                if (error) {
                    console.log("User could not be loaded" + error);
                }
                res.send(user);
            });
    },
    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.status(403);
            res.end();
        }
    }

};