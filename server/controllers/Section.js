const section = require("../Models/Section")
const Course = require("../Models/Course")



exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

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
        console.log("corse Model",Course)
        const UpdatedCours = await Course.findByIdAndUpdate(
             courseId ,
            {
                $push: { courseContent: createdSection._id }
            },
            { new: true })
            console.log("id of created Course", UpdatedCours)

        return res.status(200).json({
            success: true,
            UpdatedCours,
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
        const { sectionName, sectionId } = req.body;

        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Data is missing"
            })

        }
        const Updatedsection = await section.findByIdAndUpdate(sectionId, { sectionName: sectionName }, { new: true })

        return res.status(200).json({
            success: true,
            Updatedsection,
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

        const { sectionId } = req.body;

        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "Data is missing"
            })
        }
        const deletedSection = await section.findByIdAndDelete(sectionId)
        return res.status(200).json({
            success: true,

            message: "successfully Deleted section and Upadted teh course "
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "errror while Deleting section   ",
            error: error.message
        })
    }
}



