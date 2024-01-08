const express = require("express")
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { Auth, isAdmin, isInstructor, isStudent } = require("../Middleware/AuthN_AothZ")




const {

    updateProfile,
    getAllUserDetails,
    Profileimage,
    getEnrolledCourses,
    deleteAccount
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// // Delet User Account



router.delete("/deleteProfile", Auth, isStudent, deleteAccount)
router.put("/updateProfile", Auth, updateProfile)
router.get("/getUserDetails", Auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", Auth, getEnrolledCourses)

router.put("/updateDisplayPicture", Auth, Profileimage) //these is for testing Auth middleware is working or not

// router.put("/imageUpload", Auth, profilePic)//these is not working but i will set these code by frontend




module.exports = router