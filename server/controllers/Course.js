const Course = require("../Models/Course")
const user = require("../Models/User")
const Category = require("../Models/Category")
const subSection = require("../Models/SubSection")
const section = require("../Models/Section")
const { uploadImageCloudinary } = require("../Utils/imageUploder")
const { convertSecondsToDuration } = require("../Utils/secToDuration")
const cloudinary = require("cloudinary").v2



exports.CreateCourse = async (req, res) => {
    console.log("START THE COURSE ADD API database")
    try {
        // fetch data from rerquest ki body
        const { courseName, courseDescription, price, whatYouWillLearn, categoryId,
            tag, instructions, status } = req.body;
        console.log("Check file is thier", req.files)
        console.log("Data from body in database--====>>>", courseName, courseDescription, price, whatYouWillLearn, price, categoryId, tag, instructions)


        // fetch the file frm req files body
        const thumnaileImg = req.files.thumnaileImg;

        console.log("THUMNAIL....", thumnaileImg)
        if (!thumnaileImg) {
            res.status(400).json({
                success: false,
                message: "Thumbnail is Not prsent",
                error: error.message
            })
        }

        if (!courseName || !courseDescription || !price || !whatYouWillLearn || !categoryId || !instructions || !tag) {
            res.status(400).json({
                success: false,
                message: "all required fill the fields"
            })
        }
        if (!status || status === undefined) {
            status = "Draft"
        }
        // check instructor
        const instructor = req.user.id;
        const instructorDetail = await user.findById({ _id: instructor });


        console.log("id of user", instructorDetail)
        if (!instructorDetail) {
            return res.status(400).json({
                success: false,
                message: "instructoer didn't get "
            })
        }
        // category Id
        const catagoryDetails = await Category.findById({ _id: categoryId });
        if (!catagoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        }
        // data cloudinary url data
        console.log("category of course", catagoryDetails)

        const thumbnailImage = await uploadImageCloudinary(thumnaileImg, process.env.FOLDER_NAME)

        console.log("URL OF IMAGE", thumbnailImage)
        // Create the Course schema1
        const createCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            instructor: instructorDetail._id,
            whatYouWillLearn: whatYouWillLearn,
            tag: tag,
            category: catagoryDetails._id,
            instructions: instructions,
            status: status,
            thumbnail: thumbnailImage.secure_url
        })
        console.log("CREATED COURSE", createCourse)
        // Update the user Dta a
        const updateUSer = await user.findByIdAndUpdate(
            { _id: instructorDetail._id },
            {
                $push: {
                    courses: createCourse._id
                }
            },
            { new: true }
        )

        const updateCategory = await Category.findByIdAndUpdate(
            { _id: categoryId },
            {
                $push: {
                    courses: createCourse._id
                }
            }, { new: true })

        console.log("HEREEEEEEEE", updateCategory)

        // Update the Tag 
        // HW

        res.status(200).json({
            success: true,
            data: createCourse,
            message: "successfully data created in db"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while saving data in dB",
            error: error.message
        })
    }
}


// Edit Course Details
exports.editCourse = async (req, res) => {
    console.log("START THE EDITCOURSE CONTROLLERS")
    try {
        const { courseId } = req.body
        console.log("COURSE ID", courseId)
        const updates = req.body
        console.log("Course Id And Updates", updates)

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            updates["thumbnail"] = thumbnailImage.secure_url;
        }

        if ("tag" in updates) {
            updates["tag"] = JSON.parse(updates["tag"])
        }

        if ("instructions" in updates) {
            updates["instructions"] = JSON.parse(updates["instructions"])
        }


        const updatedCourse = await Course.findByIdAndUpdate({
            _id: courseId,
        },
            updates,
            {
                new: true
            }
        )
            // .populate({
            //     path: "instructor",
            //     // populate: {
            //     //     path: "additionalDetails",
            //     // },
            // })
            .populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        console.log("UPdated Course", updatedCourse)

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}



// GetAll data 

exports.GetAllCourse = async (req, res) => {
    try {
        const allCourse = await Course.find({})
        return res.status(400).json({
            success: true,
            allCourse,
            message: "succcesfully data fetched"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while saving data in dB",
            error: error.message
        })
    }
}



exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        console.log("COURSE ID", courseId, userId
        )

        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()
        let courseProgressCount = await courseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        if (courseDetails.status === "Draft") {
            return res.status(403).json({
                success: false,
                message: `Accessing a draft course is forbidden`,
            });
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })
        console.log("totalDurationInSeconds", totalDurationInSeconds)

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}




exports.getCourseDetails = async (req, res) => {
    try {
        //get id
        const { courseId } = req.body;
        console.log("Course Id--==>>>", courseId)
        //find course details
        const courseDetails = await Course.find(
            { _id: courseId })
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    },
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        //validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "Course Details fetched successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while saving data in dB",
            error: error.message
        })
    }
}




// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {// Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })
        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    console.log("STARTED COURSE DELETE CONTROLLER")
    try {
        const { courseId } = req.body;
        console.log("courseID", courseId);

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await user.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            });
        }
        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const Section = await section.findById(sectionId);
            if (Section) {
                const subSections = Section.subSection;
                for (const subSectionId of subSections) {
                    await subSection.findByIdAndDelete(subSectionId);
                }
            }
            // Delete the section
            await section.findByIdAndDelete(sectionId);
        }
        // Delete the course
        console.log("END COURSE DELETE ");
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// Delete the Course
// exports.deleteCourse = async (req, res) => {
//     console.log("STARTED COUSE DELETE CONTROLLER")
//     try {
//         const { courseId } = req.body
//         console.log("courseID", courseId)
//         // Find the course
//         const course = await Course.findById(courseId)
//         if (!course) {
//             return res.status(404).json({ message: "Course not found" })
//         }

//         // Unenroll students from the course
//         const studentsEnrolled = course.studentsEnrolled
//         for (const studentId of studentsEnrolled) {
//             await user.findByIdAndUpdate(studentId, {
//                 $pull: { courses: courseId },
//             })
//         }
//         console.log("SECTION COUSE DELETE ")

//         // Delete sections and sub-sections
//         const courseSections = course.courseContent
//         for (const sectionId of courseSections) {
//             // Delete sub-sections of the section
//             // const section = await section.findById(sectionId)

//             // if (section) {
//             //     const subSections = section.subSection
//             //     for (const subSectionId of subSections) {
//             //         await subSection.findByIdAndDelete(subSectionId)
//             //     }
//             // }

//             // // Delete the section
//             // await section.findByIdAndDelete(sectionId)
//         }

//         // Delete the course
//         console.log("END COUSE DELETE CONTROLLER")
//         await Course.findByIdAndDelete(courseId)

//         return res.status(200).json({
//             success: true,
//             message: "Course deleted successfully",
//         })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message,
//         })
//     }
// }
