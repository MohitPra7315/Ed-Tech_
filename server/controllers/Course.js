const Course = require("../Models/Course")
const user = require("../Models/User")
const Category = require("../Models/Category")
const { uploadImageCloudinary } = require("../Utils/imageUploder")

const cloudinary = require("cloudinary").v2



exports.CreateCourse = async (req, res) => {
    console.log("START THE COURSE ADD API database")


    // try {
    //     // Get user ID from request object
    //     const userId = req.user.id

    //     // Get all required fields from request body
    //     let {
    //         courseName,
    //         courseDescription,
    //         whatYouWillLearn,
    //         price,
    //         tag: _tag,
    //         categoryId,
    //         status,
    //         instructions: _instructions,
    //     } = req.body
    //     // Get thumbnail image from request files
    //     const thumnaileImg = req.files.thumnaileImg;


    //     // Convert the tag and instructions from stringified Array to Array
    //     const tag = JSON.parse(_tag)
    //     const instructions = JSON.parse(_instructions)

    //     console.log("tag", tag)
    //     console.log("instructions", instructions)

    //     // Check if any of the required fields are missing
    //     if (
    //         !courseName ||
    //         !courseDescription ||
    //         !whatYouWillLearn ||
    //         !price ||
    //         !tag.length ||
    //         !thumbnail ||
    //         !categoryId ||
    //         !instructions.length
    //     ) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "All Fields are Mandatory",
    //         })
    //     }
    //     if (!status || status === undefined) {
    //         status = "Draft"
    //     }
    //     // Check if the user is an instructor
    //     const instructorDetails = await user.findById(userId, {
    //         accountType: "Instructor",
    //     })

    //     if (!instructorDetails) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "Instructor Details Not Found",
    //         })
    //     }

    //     // Check if the tag given is valid
    //     const categoryDetails = await Category.findById(categoryId)
    //     if (!categoryDetails) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "Category Details Not Found",
    //         })
    //     }
    //     // Upload the Thumbnail to Cloudinary
    //     const thumbnailImage = await uploadImageCloudinary(
    //         thumnaileImg,
    //         process.env.FOLDER_NAME
    //     )
    //     console.log(thumbnailImage)
    //     // Create a new course with the given details
    //     const newCourse = await Course.create({
    //         courseName,
    //         courseDescription,
    //         instructor: instructorDetails._id,
    //         whatYouWillLearn: whatYouWillLearn,
    //         price,
    //         tag,
    //         categoryId: categoryDetails._id,
    //         thumbnail: thumbnailImage.secure_url,
    //         status: status,
    //         instructions,
    //     })

    //     // Add the new course to the User Schema of the Instructor
    //     await user.findByIdAndUpdate(
    //         {
    //             _id: instructorDetails._id,
    //         },
    //         {
    //             $push: {
    //                 courses: newCourse._id,
    //             },
    //         },
    //         { new: true }
    //     )
    //     // Add the new course to the Categories
    //     const categoryDetails2 = await Category.findByIdAndUpdate(
    //         { _id: categoryId },
    //         {
    //             $push: {
    //                 courses: newCourse._id,
    //             },
    //         },
    //         { new: true }
    //     )
    //     console.log("HEREEEEEEEE", categoryDetails2)
    //     // Return the new course and a success message
    //     res.status(200).json({
    //         success: true,
    //         data: newCourse,
    //         message: "Course Created Successfully",
    //     })
    // } catch (error) {
    //     // Handle any errors that occur during the creation of the course
    //     console.error(error)
    //     res.status(500).json({
    //         success: false,
    //         message: "Failed to create course",
    //         error: error.message,
    //     })
    // }




    try {
        // fetch data from rerquest ki body
        const { courseName, status, courseDescription, price, whatYouWillLearn, categoryId,
            tag
            , instructions
        } = req.body;
        console.log("thumbnail is there", req.files)
        // const thumnaileImg = req.files
        const userId = req.user.id
        console.log("Data from body in database--====>>>", courseName, courseDescription, price, whatYouWillLearn, price, thumnaileImg, categoryId, tag, instructions)

        // fetch the file frm req files body

        // Convert the tag and instructions from stringified Array to Array
        // const tag = JSON.parse(tag)
        // const instructions = JSON.parse(instructions)

        if (!courseName || !courseDescription || !price || !whatYouWillLearn || !categoryId || !instructions.length || !tag || !thumnaileImg) {
            res.status(400).json({
                success: false,
                message: "all required fill the fields"
            })
        }
        // check instructor
        const instructor = req.user.id;
        const instructorDetail = await user.findById(userId, {
            accountType: "Instructor",
        })

        console.log("id of user", instructorDetail)
        if (!status || status === undefined) {
            status = "Draft"
        }


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

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error while saving data in dB",
            error: error.message
        })
    }
}


// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
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
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
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




exports.getCourseDetails = async (req, res) => {
    try {
        //get id
        const { courseId } = req.body;
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
            .populate("Category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        console.log("working till there")

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
            message: "Course Details fetched successfully",
            data: courseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while saving data in dB",
            error: error.message
        })
    }
}