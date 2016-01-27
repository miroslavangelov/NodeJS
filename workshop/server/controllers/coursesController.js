var Course = require("mongoose").model("Course");

module.exports = {

    getAllCourses: function(req, res, next) {
        Course.find({}).exec(function (err, collection) {
            if (err) {
                console.log("courses could not be loaded" + err);
            }
            else {
                res.send(collection);
            }
        });
    },
    getCourseById: function(req, res, next) {
        Course.findOne({_id: req.params.id})
            .exec(function(error, course) {
                if (error) {
                    console.log("Course could not be loaded" + error);
                }
                res.send(course);
            })
    }

};

