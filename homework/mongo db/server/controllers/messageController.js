var Message = require('mongoose').model('Message');

module.exports = {
    sendMessage: function(req, res) {
        var messageData = {
            from: req.from,
            to: req.to,
            text: req.text
        };

        Message.create(messageData, function (error, message) {
            if (error) {
                console.log('Failed to create message ' + error);
            }
        });
    },
    getMessagesBetweenUsers: function(req, res) {
        Message.find({$or: [{
            from: req.with,
            to: req.and
        }, {
            from: req.and,
            to: req.with
        }
        ]})
            .exec(function(error, messages) {
                if (error) {
                    console.log("Finding chat failed " + error);
                }
                else {
                    var chat = [];
                    for (var i = 0, len = messages.length; i < len; i++) {
                        var currentMessage = messages[i].text;
                        chat.push(currentMessage);
                    }
                    console.log(chat);
                }
            })
    }
};