

const express = require("express");

const router = express.Router()


// / login ,signup data and Otp controllers
const { sendotp, SignUp, Login ,changePasssword} = require("../controllers/Auth")
const {Auth}=require("../Middleware/AuthN_AothZ")
// user controllers
const { profile } = require("../controllers/Profile")


// Reset password controllers
const { ResetPasswordToken, ResetPassword } = require("../controllers/ResetPassword")

// payment controllers
// const { capturePayment, verifySignature, } = require("../controllers/Payment")


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


router.post("/sendOtp", sendotp)
router.post("/signup", SignUp)
router.post("/Login", Login)

router.post("/changePassword",changePasssword)


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************


// Route for generating a reset password token
router.post("/reset-password-token",ResetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password",ResetPassword)



module.exports = router;


