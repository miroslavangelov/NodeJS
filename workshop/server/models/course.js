var mongoose = require("mongoose");
var courseSchema = mongoose.Schema({
    title: String,
    featured: Boolean,
    published: Date,
    tags: [String]
});

var Course = mongoose.model("Course", courseSchema);

module.exports.seedInitialCourses = function() {
    Course.find({}).exec(function(err, collection) {
        if (err) {
            console.log("Can not find courses: " + err);
            return;
        }

        if (collection.length === 6) {
            Course.create({
                title: "Java",
                featured: true,
                published: new Date('13/11/2015')
            });
            Course.create({
                title: "C++",
                featured: false,
                published: new Date('8/5/2013')
            });
            Course.create({
                title: "C",
                featured: true,
                published: new Date('9/1/2012')
            });

            console.log("courses added")
        }
    });
};