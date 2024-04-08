const user = require("../Models/User")
const OTP = require("../Models/OTP")
const otpGenerator = require('otp-generator')
const profile = require("../Models/Profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailSender = require("../Utils/NodeAmiler")

require("dotenv").config()

exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await user.findOne({ email });
        // to be used in case of signup
        console.log("User is Already Registered", checkUserPresent)

        // If user found with provided email
        if (checkUserPresent) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is Already Registered`,
            });
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.findOne({ otp: otp });
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);
        while (result !== null) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }
        const otpPayload = { email, otp };
        console.log("otp has been created and next is the created method")
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};



// Signup User

// fetch data from body
exports.SignUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,

            otp

        } = req.body
        console.log("request data from bodt", req.body)
        // check if All Details are ther or not
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "please Fill the full details"
            })
        }
        if (email.indexOf('@gmail.com') === -1) {
            return res.status(403).json({
                success: false,
                message: "email is not valid"
            })
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again."
            })
        }
        // check user is already here or not
        const userdata = await user.findOne({ email })
        if (userdata) {
            return res.status(400).json({
                success: false,
                message: "User aldready registered,please Sign in to Continue"
            })
        }
        //  validate most recent Otp
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response, "OTP response is thier");
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }


        // hashpassword for saving inside db
        const hashPassword = await bcrypt.hash(password, 10)


        const savedProfile = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: "",
            contactNumber: null
        })


        const saveddata = await user.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            confirmPassword,
            accountType: accountType,
            additionalDetails: savedProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })


        console.log("res", saveddata)
        res.status(200).json({
            success: true,
            data: saveddata,
            message: "successfully  user "
        })

    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "error  saved data user",
            error: error.message
        })
    }
}


exports.Login = async (req, res) => {
    try {


        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: "plese fill coreect password and email"
            })
        }

        let userdata = await user.findOne({ email })

        if (!userdata) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: "user is not registered"
            })
        }
        console.log("userdata", userdata)
        let paylod = {
            id: userdata._id,
            email: userdata.email,
            accountType: userdata.accountType,

        }
        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, userdata.password)) {

            let token = jwt.sign(paylod, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            userdata = userdata.toObject();
            userdata.token = token,
                userdata.password = undefined
            userdata.confirmPassword = undefined

            let options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }



            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                User: userdata,
                message: "succesfully saved"

            })





        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    } catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}



// $ change password controllers

exports.changePasssword = async (req, res) => {
    try {
        // user data from request body
        const userDetails = await user.findById(req.user.id);


        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // validate oldpassword in db
        const oldpasswordData = await user.find({ password: oldPassword })

        // if not present 
        if (!oldpasswordData) {
            return res.json({
                success: false,
                message: "oold paasword is snor matching with saved password ,please try again"
            })
        }
        // hash password 
        const hashPassword = await bcrypt.hash(newPassword, 10)
        // 
        const UpdateduserDetails = await user.findByIdAndUpdate(
            { password: oldPassword },
            { password: hashPassword },
            { new: true }
        )
        // fetch the email for send the mail 
        await mailSender(UpdateduserDetails.email,
            "password has been changed",
            UpdateduserDetails)

        return res.json({
            success: true,
            post: UpdateduserDetails,
            message: "successfully change password"

        })

    } catch (error) {
        return res.json({
            success: true,
            message: "successfully change password"

        })
    }
}

