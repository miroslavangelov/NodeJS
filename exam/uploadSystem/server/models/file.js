var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    uploadingDate: {
        type: Date,
        default: new Date()
    },
    fileName: String,
    isPrivate: {
        type: Boolean,
        default: false
    },
    createdBy: String
});
var File = mongoose.model("File", fileSchema);

module.exports = {
    addFiles: function (files) {

        for (var file in files) {
            File.create(files[file]);
        }
    }
};
