const user = require("../Models/User")
const OTP = require("../Models/OTP")
const otpGenerator = require('otp-generator')
const profile = require("../Models/Profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailSender = require("../Utils/NodeAmiler")

require("dotenv").config()
// exports.sendOtp = async (req, res) => {
//     try {
//         // fetch email from req body
//         const { email } = req.body;
//         // user exist or not 

//         const USerdata = await user.findOne({ email })

//         //  ifuser will get 401
//         if (USerdata) {
//             return res.status(401).json({
//                 success: false,
//                 message: "user already registered"
//             })
//         }

//         // otp generate



//         // check Unique  Otp  or Not ?

//         try {

//             const resultOtp = await OTP.find({ otp: otp }).
//                 console.log("Result is Generate OTP Func");
//             console.log("OTP", otp);
//             console.log("Result", resultOtp);
//             while (resultOtp) {
//                 otp = otpGenerator.generate(6, {
//                     upperCaseAlphabets: false,
//                     lowerCaseAlphabets: false,
//                     specialChars: false
//                 });

//                 const resultOtp = await OTP.findOne({ otp: otp })
//             }
//             return res.status(200).json({
//                 success: true,
//                 message: "otp uniquew created"
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: "otp  not error uniquew created"
//             })
//         }
//         // created the otp inside the otp Schema



//         const savedOtp = await OTP.create({
//             email, otp
//         })

//         console.log("saved oto")
//         // send the otp on mail for confirmation

//         res.status(200).json({
//             success: true,
//             otp: savedOtp,
//             message: "created new otp at database"
//         })


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "error wjile creating new otp at database",
//             error: error.message
//         })
//     }
// }


// exports.sendOtp = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Check if user is already present
//         // Find user with provided email
//         const checkUserPresent = await user.findOne({ email });
//         // to be used in case of signup

//         // If user found with provided email
//         if (checkUserPresent) {
//             // Return 401 Unauthorized status code with error message
//             return res.status(401).json({
//                 success: false,
//                 message: `User is Already Registered`,
//             });
//         }

//         var ottp = otpGenerator.generate(6, {
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false,
//         });
//         const result = await OTP.findOne({ otp: ottp });
//         console.log("Result is Generate OTP Func");
//         console.log("OTP", ottp);
//         console.log("Result", result);
//         while (result) {
//             otp = otpGenerator.generate(6, {
//                 upperCaseAlphabets: false,
//             });
//         }
//         const otpPayload = { email, ottp };
//         const otpBody = await OTP.create(otpPayload);
//         console.log("OTP Body", otpBody);
//         res.status(200).json({
//             success: true,
//             message: `OTP Sent Successfully`,
//             otp,
//         });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await user.findOne({ email });
        // to be used in case of signup

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
            contactNumber,
            otp

        } = req.body

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
        console.log(userdata, "user data from  email check")
        if (userdata) {
            return res.status(400).json({
                success: false,
                message: "User aldready registered,please Sign in to Continue"
            })
        }

        //  validate most recent Otp
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response, "response is thier");
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
        console.log("otp matched is equeal", typeof otp)
        console.log("most recent  matched is equeal", typeof response[0].otp)

        // hashpassword for saving inside db
        const hashPassword = await bcrypt.hash(password, 10)


        const savedProfile = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: "",
            contactNumber: contactNumber
        })

        const saveddata = await user.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            confirmPassword,
            accountType,
            contactNumber,
            additionalDetails: savedProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        res.status(200).json({
            success: true,
            post: saveddata,
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

// validate email
// 2 password metch
// find most recent otp from DB
// valid Otp
// Hash password
// Entery create DB




// Login controllers
// exports.Login = async (req, res) => {
//     try {
//         // fetch data from req.body
//         const { email, password } = req.body

//         console.log("email", email, "password", password)
//         // validate data
//         if (!email || !password) {
//             return res.status(401).json({
//                 success: false,
//                 message: "inccorect given details"
//             })
//         }

//         // check user in db
//         const userData = await user.find({ email })
//         if (!userData) {
//             return res.status(400).json({
//                 success: false,
//                 message: "user doen't exist please Signup first"
//             })
//         }
//         const payload = {
//             email: userData.email,
//             accountType: userData.accountType,
//             id: userData._id
//         }
//         if (bcrypt.compare(password, userData.password)) {
//             const token = jwt.sign(payload, process.env.SCREAT, {
//                 expiresIn: "2hr"
//             })

//             userData = userData.toObject();
//             userData.password = undefined,
//                 userData.token = token

//             let options = {
//                 expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                 httpOnly: true
//             }
//             res.cookie("Token", token, options).json({
//                 success: true,
//                 token,
//                 userData,
//                 message: "succesfully created data"

//             })

//         }
//         else {
//             return res.status(403).json({
//                 success: false,
//                 message: "password Incorrect"
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "error while data Login  in databse",
//             error: error.message
//         })
//     }
// }

exports.Login = async (req, res) => {
    try {
        console.log("JWT_SECRET", process.env.JWT_SECRET)
        const { email, password } = req.body;
        //check  valid passoerard or email or not 
        console.log("email", email, "password", password)
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "plese fill coreect password and email"
            })
        }

        let userdata = await user.findOne({ email });

        if (!userdata) {
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
        if (await bcrypt.compare(password, userdata.password)) {

            let token = jwt.sign(paylod, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })
            console.log("convert to object")
            userdata = userdata.toObject();
            userdata.token = token,
                userdata.password = undefined
            userdata.confirmPassword = undefined
            console.log("converted to object", userdata)

            let options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }


            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                userdata,
                message: "succesfully saved"

            })



        } else {
            return res.status(403).json({
                success: false,
                message: "password Incorrect"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            post: "error while login ",
            message: error.message
        })
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