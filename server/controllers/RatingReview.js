const RatingandReview = require("../Models/RatingAndReview");
const Course = require("../Models/Course")
const mongoose = require("mongoose")


exports.CreateRating = async (req, res) => {
    try {
        // fetch data from body
        const userId = req.user.id
        const { rating, review, courseID } = req.body;

        // const CourseDetail from courseID
        const CourseDetails = await Course.findById({
            _id: courseID,
            studentEnrolled: { $Match: { $eq: userId } }
        })
        // validate the 
        if (!CourseDetails) {
            return res.status(404).json({
                succcess: false,
                message: "data Not found"
            })
        }
        // if user have already reviewd
        const alreadyReviewed = await RatingandReview.findById({
            user: userId,
            course: courseID
        })

        //   check if didn't get reviewed user

        if (!alreadyReviewed) {
            return res.status(404).json({
                succcess: false,
                message: "user already revired and rating"
            })
        }

        // if not found alreadyReviwed user so then 

        const RatingReview = await RatingandReview.create({
            rating: rating,
            review: review
        })

        const UpdatedCourse = await Course.findByIdAndUpdate({
            _id: courseID
        }, {
            $push: {
                ratingAndReview: RatingReview.id
            }
        }, { new: true })
        console.log(UpdatedCourse);
        return res.status(200).json({
            success: true,
            RatingReview,
            message: "succesfully reviwed by user and Update",
            UpdatedCourse
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while create Rating review and Update the CourseDetails  "
            , error: error.message
        })
    }
}


exports.GetAverageRating = async (req, res) => {
    try {
        // fetch CourseId from request body
        const { courseID } = req.body;

        // fetch all rating from course model who all are give

        const avgRatingResult = await RatingandReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseID)
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "rating" }
                }
            }
        ])
        // if validate
        if (avgRatingResult.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: avgRatingResult[0].averageRating
            })
        }
        else
            return res.status(200).json({
                success: true,
                message: "avwrage rating is 0,no rating still now",
                avgRatingResult: 0
            })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while getting average rating  "
            , error: error.message
        })
    }
}




// allrating


exports.GetAllRating = async (req, res) => {
    try {
        // fetch CourseId from request body


        // fetch all rating from course model who all are give
        const allReview = await RatingandReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "User",
                select: "firstName,lastName,email,image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec()

        return res.status(200).json({
            succcess: true,
            message: "successfully updated Course and Rating",
            data: allReview
        })






    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while getting average rating  "
            , error: error.message
        })
    }
}


