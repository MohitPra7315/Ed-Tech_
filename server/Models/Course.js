
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName: { type: String },
    courseDescription: { type: String },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    whatYouWillLearn: {
        type: String,
    },
    demoVedioUrl: {
        type: String
    },
    coveredTopic: {
        type: [String]
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
        },
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
    ],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    createdAt: { type: Date, default: Date.now },
})





module.exports = mongoose.model("Course", CourseSchema) 