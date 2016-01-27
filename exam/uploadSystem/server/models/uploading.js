var fs = require("fs");
var FILES_DIR = __dirname + "/" + "../../files";
var mkdirp = require('mkdirp');


module.exports = {
    saveFile: function(file, path, fileName) {
        if (!fs.existsSync(FILES_DIR + path)) {
            var splitPath = path.split("/");
            var newPath = splitPath[1];
            mkdirp(FILES_DIR + "/" + newPath + "/", function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        mkdirp(FILES_DIR + path, function(err) {
            if (err) {
                console.log(err);
            }
        });

        var fstream = fs.createWriteStream(FILES_DIR + path + fileName);
        file.pipe(fstream);
    }
};