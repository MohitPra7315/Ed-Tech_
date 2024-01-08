
const user = require("../Models/User")
const Profile = require("../Models/Profile")
const { uploadImageCloudinary } = require("../Utils/imageUploder")

exports.Createprofile = async (req, res) => {
  try {

    const { gender, dateOfBirth, about, contactNumber } = req.body;
    const id = req.user.id;
    if (!id || !gender || !dateOfBirth || !about || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "field  all Required"
      })
    }
    // get user data 
    const userDetails = await user.findById(id);
    // get profile data ID
    const ProfileID = await userDetails.additionalDetails
    const ProfileDetail = await Profile.findById(ProfileID);
    // Update ProfileDetails
    ProfileDetail.gender = gender,
      ProfileDetail.dateOfBirth = dateOfBirth,
      ProfileDetail.about = about,
      ProfileDetail.contactNumber = contactNumber

    // create in database
    const UpdatedProfile = await ProfileDetail.save();

    return res.status(200).json({
      success: true,
      UpdatedProfile,
      message: "successfully Updated Profile"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while Updating the Profile "
      , error: error.message
    })
  }
}

// exports.updateProfile = async (req, res) => {
//   try {
//     console.log("start updateprofile")
//     const { dateOfBirth="", about="", contactNumber, gender="" } = req.body;
//     const id = req.user.id;
//     // console.log("dOb", dateOfBirth)
//     // console.log("id is", id)

//     // Find the profile by id
//     const userDetails = await User.findById(id);
//     console.log("userDetails of user ", userDetails.additionalDetails._id)

//     const profile = await Profile.findByIdAndUpdate(userDetails.additionalDetails);
//     console.log("profile of user ", profile)
//     // Update the profile fields
//     profile.dateOfBirth = dateOfBirth;
//     profile.about = about;
//     profile.contactNumber = contactNumber;
//     profile.gender = gender

//     // Save the updated profile
//     const savedProfile = await profile.save();
//     console.log("updated  data ", savedProfile)

//     return res.json({
//       success: true,
//       message: "Profile updated successfully",
//       savedProfile,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };


exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    console.log("updated data", userDetails.additionalDetails)
    const profile = await Profile.findById(userDetails.additionalDetails);
    console.log("updated data", profile)

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender

    // Save the updated profile
    await profile.save();
    console.log("updated data", profile)

    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)

      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.Profileimage = async (req, res) => {
  console.log("working .........")
  try {
    console.log("file in body", req.files)
    // console.log("file in files", req.files)

    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    console.log("Printing ID ", userId)

    const image = await uploadImageCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await user.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.deleteAccount = async (req, res) => {
  try {
    // TODO: Find More on Job Schedule
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    console.log("The answer to life, the universe, and everything!");
    // });
    const id = req.user.id;
    console.log("printing ID:-", id);
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    // TODO: Unenroll User From All the Enrolled Courses
    // Now Delete User
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    console.log("get enrolled backend controller")
    const userId = req.user.id
    const userDetails = await user.findOne({
      _id: userId,
    }).populate("course").exec()
    console.log("get enrolled user", userDetails)
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

// updateProfile