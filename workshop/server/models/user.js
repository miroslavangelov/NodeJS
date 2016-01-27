var mongoose = require("mongoose");
var encryption = require("../utilities/encryption")

var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    firstname: {
        type: String,
        require: '{PATH} is required'
    },
    lastname: {
        type: String,
        require: '{PATH} is required'
    },
    salt: String,
    hashPass: String,
    roles: [String]
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
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log("Can not find users: " + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashPass;
            salt = encryption.generateSalt();
            hashPass = encryption.generateHashedPassword(salt, "miro");
            User.create({
                username: "miro",
                firstName: "miroslav",
                lastName: "angelov",
                salt: salt,
                hashPass: hashPass,
                roles: ["admin"]
            });
            User.create({
                username: "gosho",
                firstName: "georgi",
                lastName: "georgiev",
                salt: salt,
                hashPass: hashPass,
                roles: ["standart"]
            });
            console.log("Users added")
        }
    });
};

