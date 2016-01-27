var User = require("mongoose").model("User");
var encryption = require("../utilities/encryption");
module.exports = {
    getAllUsers: function(req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log("users could not be loaded" + err);
            }
            else {
                res.send(collection);
            }
        });
    },
    createUser: function(req, res, next) {
        console.log(req.body)
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(error, user) {
            if (error) {
                console.log("Failed to register new user" + error);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                   res.status(400);
                    return res.send({reason: err.toString()})
                }
                res.send(user);
            })
        });
    },
    editProfile: function(req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf("admin") > -1) {
            var editedUserData = req.body;
            console.log(editedUserData)
            if (editedUserData.password && editedUserData.password.length > 0) {
                editedUserData.salt = encryption.generateSalt();
                editedUserData.hashPass = encryption.generateHashedPassword(editedUserData.salt, editedUserData.password);
            }
            User.update({_id: req.body._id}, editedUserData, function() {
                res.end();
            });
        }
        else {
            res.send({reason: "You don't have permission!"});
        }

    }
};
