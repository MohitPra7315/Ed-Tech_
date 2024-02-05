const section = require("../Models/Section")
const Subsection = require("../Models/SubSection")
const { uploadImageCloudinary } = require("../Utils/imageUploder")
require("dotenv").config()
exports.createSubsection = async (req, res) => {
  try {

    const { title, timeDuration, description, sectionId } = req.body;

    const videoFile = req.files.videoFile;

    if (!title || !timeDuration || !description || !sectionId || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    // Upload file on Cloudinary
    const UploadedFile = await uploadImageCloudinary(videoFile, process.env.FOLDER_NAME)


    const createdSubSection = await Subsection.create({
      title, timeDuration, description, videoUrl: UploadedFile.secure_url
    })
    console.log("video File", createdSubSection)

    const Updatedsection = await section.findByIdAndUpdate(sectionId,
      {
        $push: { subSection: createdSubSection._id }
      },
      { new: true }).populate("subSection")
    console.log("Updated Section  File", Updatedsection) 

    return res.status(200).json({
      success: true,
      Updatedsection,
      createdSubSection,
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
    const { sectionId, title, description } = req.body
    const subSection = await Subsection.findById(sectionId)

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