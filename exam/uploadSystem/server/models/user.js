var encryption = require("./encryption");
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    salt: String,
    hashPass: String,
    points: {
        type: Number,
        default: 0
    }
});
userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
});
var User = mongoose.model("User", userSchema);
module.exports.seedInitialUsers = function() {
    User.find({}).exec(function (error, collection) {
        var salt = encryption.generateSalt();
        var hashPass = encryption.generateHashedPassword(salt, "dimka");

        if (error) {
            console.log("can not find users");
            return;
        }
        if (collection.length === 2) {
            User.create({
                username: "dimka",
                salt: salt,
                hashPass: hashPass
            });
            console.log("users added");
        }
    });
};

