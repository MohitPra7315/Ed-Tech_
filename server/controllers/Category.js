const Category = require("../Models/Category")
const Course = require("../Models/Course")

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
exports.CategoryCreate = async (req, res) => {
    try {

        const { userId } = req.user.id;
        console.log("user", userId)
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "please field the required daata"
            })
        }
        const savedCategory = await Category.create({
            name: name,
            description: description
        })

        res.status(200).json({
            success: true,
            post: savedCategory,
            message: "successfully data created category in Database"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}



// All TaGS

exports.showAllCategory = async (req, res) => {
    try {
        const Alldata = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            data: Alldata,
            message: "successfully data created in Database"
        })
    } catch (error) {
        res.status(500).json({
            success: false,

            error: error.message
        })
    }
}



// we Controllers for category course and different a=couse and Top seling course


// exports.CategoryPageCourse = async (req, res) => {
//     try {
//         // fetch Category Course ID 
//         const { categoryID } = req.body;
//         // validate the data 

//         if (!categoryID) {
//             return res.status(400).json({
//                 success: false,
//                 message: "send the catagory id"
//             })
//         }
//         // 1 type category Course
//         const CategoryCourses = await Category.findById({ categoryID }).populate("course").exec()
//         // 2 Type different from category course

//         const differentCourses = await Category.find({ _id: { $ne: categoryID } }).populate("Course").exec()

//         // 3 Type top selling Course 
//         // Home work 


//         res.status(200).json({
//             success: true,
//             CategoryCourses: CategoryCourses,
//             differentCourses: differentCourses,
//             topSellingCourses: "pending for  write logic"
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "error occoured while fetching Category courses",
//             error: error.message
//         })
//     }
// }


// exports.showAllCategory



exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path:"instructor"
                }
            })

            .exec()

        console.log("SELECTED COURSE", selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.")
            return res
                .status(404)
                .json({ success: false, message: "Category not found" })
        }
        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },

            })
            .exec()
        console.log()
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)


        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
