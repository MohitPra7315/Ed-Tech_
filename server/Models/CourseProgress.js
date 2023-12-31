const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema({
    couresId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ]

})


module.exports = mongoose.model("CourseProgress", CourseProgressSchema)