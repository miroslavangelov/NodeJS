var auth = require("./auth");
var filesController = require("../controllers/filesCntroller");
module.exports = function(app) {
    app.post("/login", auth.login);
    app.post("/register", auth.register);
    app.put("/edit/profile", auth.isAuthenticated, auth.editProfile);
    app.get("/edit/profile", auth.isAuthenticated, auth.getUserProfile);
    app.post('/upload', auth.isAuthenticated, filesController.postUpload);
    app.get("/user-files", auth.isAuthenticated, filesController.getUserFiles);
    app.get('/all-files', filesController.getFiles);
    app.get('/download/:url', filesController.downloadFile);
    app.get('/files/delete/:_id', auth.isAuthenticated, filesController.deleteFile);
    app.get('/files/privacy/:_id', auth.isAuthenticated, filesController.changePrivacy);
};