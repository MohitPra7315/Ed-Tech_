
const user = require("../Models/User")
exports.AllInstructor = async (req, res) => {
    try {
        const result = await user.find({accountType : "Instructor"})
        .populate("additionalDetails")
        .exec();
        console.log("data is their",result);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Instructor is not Found",
            })
        }
        return res.status(200).json({
            success: true,
            data: result,
            message: "succesfully find Instructor"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while fetching AllInstructor data ",
            error: error.message
        })
    }
}