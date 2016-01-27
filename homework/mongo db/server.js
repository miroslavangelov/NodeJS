var config = require("./server/config/config");
require('./server/config/mongoose')(config);
var userController = require("./server/controllers/userController");
var messageController = require("./server/controllers/messageController");

userController.register({
    username: 'Miro',
    password: 'Miro'
});

userController.register({
    username: 'Hristo',
    password: 'Hristo'
});

messageController.sendMessage({
    from: 'Miro',
    to: 'Hristo',
    text: 'Hi, Hristo!'
});

messageController.sendMessage({
    from: 'Hristo',
    to: 'Miro',
    text: 'Hi. How are you, Miro?'
});

messageController.getMessagesBetweenUsers({
    with: 'Miro',
    and: 'Hristo'
});