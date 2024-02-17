const section = require("../Models/Section")
const Course = require("../Models/Course")

const Subsection = require("../Models/SubSection")

exports.createSection = async (req, res) => {

    try {
        const { sectionName, courseId } = req.body;

        console.log("CREATE SECTion Dta from Request BODY", section)
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "data missing"
            })
        }

        const createdSection = await section.create({
            sectionName
        })
        console.log("id of created section", createdSection._id)
        const UpdatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { courseContent: createdSection._id }
            },
            { new: true }
        ).populate(
            {
                path: "courseContent",
                populate: { path: "subSection" }
            })
            .exec()
        console.log("id of created Course", UpdatedCourse)

        return res.status(200).json({
            success: true,
            UpdatedCourse,
            message: "successfully created entery and Upadted teh course "
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "errror while Upadting course  ",
            error: error.message
        })

    }
}



exports.UpdateSection = async (req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body;
        console.log("CHECK API IS WORKING OR NOT....!", sectionName, sectionId, courseId)

        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Data is missing"
            })

        }
        const Updatedsection = await section.findByIdAndUpdate(sectionId, { sectionName: sectionName }, { new: true })

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                },
                
            })
            .exec()
        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "successfully Updated section Name and Upadted teh course "
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "errror while Upadting section time  ",
            error: error.message
        })

    }
}



exports.DeleteSection = async (req, res) => {

    try {
        const { sectionId, courseId } = req.body
        console.log("DELETE SECTION Backend API ............", sectionId, courseId)

        await Course.findByIdAndUpdate(courseId,
            {
                $pull: {
                    courseContent: sectionId,
                },
            })
        const sectiondata = await section.findById(sectionId)
        console.log(sectionId, courseId)
        if (!sectiondata) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }
        // Delete the associated subsections
        await Subsection.deleteMany({ _id: { $in: section.subSection } })

        await section.findByIdAndDelete(sectionId)

        // find the updated course and return it
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()




        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course,
        })
    } catch (error) {
        console.error("Error deleting section:", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
    // try {

    //     const { sectionId } = req.body;

    //     if (!sectionId) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Data is missing"
    //         })
    //     }
    //     const deletedSection = await section.findByIdAndDelete(sectionId)
    //     const updateSection = await section.findById(sectionId).populate("subSection").exec()

    //     return res.status(200).json({
    //         success: true,
    //         data: updateSection,
    //         message: "successfully Deleted section and Upadted teh course "
    //     })

    // } catch (error) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "errror while Deleting section   ",
    //         error: error.message
    //     })
    // }
}



