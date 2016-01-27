var encryption = require("../models/encryption"),
    uploading = require('../models/uploading'),
    files = require('../models/file');

var File = require("mongoose").model("File");
var User = require("mongoose").model("User");

var CONTROLLER_NAME = 'files';
var URL_PASSWORD = 'magic unicorns pesho gosho1';

var uploadedFiles = [];

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if(dd < 10){
        dd='0'+dd
    }

    if(mm < 10){
        mm= '0'+mm
    }

    return dd + '-' + mm + '-' + yyyy;
}


module.exports = {
    postUpload: function (req, res, next) {
        req.pipe(req.busboy);
        var points = req.user.points || 0;
       // console.log(points)

        var username = req.user.username;
        req.busboy.on('file', function (fieldname, file, filename) {
            var fileNameHashed = encryption.generateHashedPassword(encryption.generateSalt(), filename);
            var currentDate = getDate();
            var path = '/' + username + '/' + currentDate + '/';
            var url = path + fileNameHashed;
            var urlEncrypted = encryption.encrypt(url, URL_PASSWORD);

            uploading.saveFile(file, path, fileNameHashed);

            uploadedFiles[username] = uploadedFiles[username] || [];

            uploadedFiles[username][fieldname] = uploadedFiles[username][fieldname] || {};
            var dbFile = uploadedFiles[username][fieldname];
            dbFile.url = urlEncrypted;
            dbFile.fileName = filename;
            dbFile.createdBy = username;

        });

        req.busboy.on('field', function (fieldname, val) {
            var index = fieldname.split('_')[1];
            uploadedFiles[username] = uploadedFiles[username] || [];
            uploadedFiles[username]['file_' + index] = uploadedFiles[username]['file_' + index] || {};
            var dbFile = uploadedFiles[username]['file_' + index];
            dbFile.isPrivate = !!val;
        });

        req.busboy.on('finish', function () {

            if (uploadedFiles[username]['file_0'].fileName !== '') {

                points+=1;
                var edited = req.user;
                edited.points = points;
                User.update({username: req.user.username}, edited, function(err) {
                    console.log(err);
                });
                files.addFiles(uploadedFiles[username]);
                //res.send({success: true});
                res.redirect("/#/user-files");
            }
            else {
                res.status(400);
                res.redirect("/#/upload");
                res.end();
            }
        });

    },
    getFiles : function(req, res, next) {
        File.find({
            isPrivate: false
        }).exec(function (err, collection) {
            if (err) {
                console.log("files could not be loaded" + err);
            }
            else {
                res.send(collection);
            }
        });
    },
    getUserFiles : function(req, res, next) {
        File.find({
            createdBy: req.user.username
        }).exec(function (err, collection) {
            if (err) {
                console.log("files could not be loaded" + err);
            }
            else {
                res.send(collection);
            }
        });
    },
    downloadFile: function(req, res, next) {
        var url = req.params.url;
        var decryptedUrl = encryption.decrypt(url, URL_PASSWORD);
        res.download(__dirname + '/../../files' + decryptedUrl);
    },
    deleteFile: function(req, res, next) {
       // console.log(req.params._id);
        File.find({
            _id: req.params._id
        })
            .remove()
            .exec(function (err) {
                if (err) {
                    console.log("deleting file failed" + err);
                }
                res.redirect("/#/user-files");
                res.end();
        });
    },
    changePrivacy: function(req, res, next) {
        var privacy;
        var asd = File.find({
            _id: req.params._id
        })
            .exec(function (err, result) {
                if (err) {
                    console.log("changing privacy failed" + err);
                    res.end();
                }
                else {
                    privacy = !result[0].isPrivate
                    File.update({_id: req.params._id}, {isPrivate: privacy}, function(err) {
                        console.log(err);
                    });
                }
                res.redirect("/#/user-files");
                res.end();
            });
    }

};