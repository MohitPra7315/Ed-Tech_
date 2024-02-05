const jwt = require("jsonwebtoken")
// import Bearer from "be\\"
require("dotenv").config()
// Auth 
exports.Auth = async (req, res, next) => {
    try {

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION",token);


        if (!token) {
            return res.json({
                success: false,
                message: "token is invalid"
            })
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload, "payload for reqbody")
            req.user = payload;

        } catch (error) {
            return res.status(401).json({
                success: false,
                error: error.message,
                Message: "token is in valid"

            })
        }
        console.log("next is about to hit")
        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "error while verifying the token",
            error: error.message
        })
    }
}


// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for student only',
            });
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while the Authization "
        })
    }
}


// isAdmin

exports.isAdmin = async (req, res, next) => {
    try {
        console.log("mil gya Admin", req.user)
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while the Authization "
        })
    }
}


// Instructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for instructor only',
            });
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while the Authization "
        })
    }
}
