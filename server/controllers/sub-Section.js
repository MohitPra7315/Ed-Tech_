const Course = require("../Models/Course")
const section = require("../Models/Section")
const Subsection = require("../Models/SubSection")
const { uploadImageCloudinary } = require("../Utils/imageUploder")
require("dotenv").config()
exports.createSubsection = async (req, res) => {
  try {

    const { title,
      // timeDuration,
      // Description,
      sectionId,
      courseId } = req.body;

    console.log("check file is their,", req.files.videoFile)
    const videoFile = req.files.videoFile;
    console.log("REQUEST DATA", title, sectionId, courseId)

    if (!title ||
      // !timeDuration ||
      // !Description ||
      !videoFile ||
      !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }


    // Upload file on Cloudinary
    const UploadedFile = await uploadImageCloudinary(videoFile, process.env.FOLDER_NAME)

    console.log("UPLOADERVIDEO....", UploadedFile)

    const createdSubSection = await Subsection.create({
      title,
      // timeDuration,
      // Description,
      videoUrl: UploadedFile.secure_url
    })
    console.log("video File", createdSubSection)



    const updatedSection = await section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: createdSubSection._id } },
      { new: true }
    ).populate("subSection")

    console.log("Updated section ", updatedSection)

    const UpdatedCourse = await Course.findByIdAndUpdate(
      courseId,
      // {
      //   $push: { courseContent: updatedSection }
      // },
      { new: true }
    ).populate(
      {
        path: "courseContent",
        populate: { path: "subSection" }
      })
      .exec()

    console.log("Updated Course-2 ", UpdatedCourse)


    return res.status(200).json({
      success: true,
      data: UpdatedCourse,
      message: "successfully sub-Section created "
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while created subsection ",
      error: error.message
    })
  }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body
    const subSection = await Subsection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    const updateSubSection = await section.findById(sectionId).populate("subSection").exec()

    return res.json({
      success: true,
      data: updateSubSection,
      message: "Section updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}



exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await Subsection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    const updatedSection = await section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      data: updatedSection,
      message: "SubSection deleted successfully"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}