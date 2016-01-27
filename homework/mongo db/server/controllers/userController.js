var User = require('mongoose').model('User');

module.exports = {
    register: function (req, res) {
        var userData = {
            username: req.username,
            password: req.password
        };

        User.create(userData, function(error, user) {
            if (error) {
                console.log('Failed to register user ' + error);
            }
        });
    }
};