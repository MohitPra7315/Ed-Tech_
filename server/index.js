const express = require("express");
const app = express()

const courseRoutes = require("./Routes/Course")
const userRoutes = require("./Routes/User")
const paymentRoutes = require("./Routes/Payment")
const profileRoutes = require("./Routes/profile");
const AllInstructors=require("./Routes/AllInstructors");

const cookieParse = require("cookie-parser")
const cors = require("cors")
const fileUploader = require("express-fileupload")
const dotenv = require("dotenv")

const PORT = process.env.PORT||5000

app.use(fileUploader(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
))
app.use(cookieParse());
app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: "*",
    credentials: true
}))
const { Auth } = require("./Middleware/AuthN_AothZ")
require("./confiq/database").dbconnection();
require("./confiq/Cloudinary").cloudinaryConnect();
app.use("/v1/auth", userRoutes)
app.use("/v1/profile", profileRoutes)
app.use("/v1/course", courseRoutes)
app.use("/v1/payment", paymentRoutes)
app.use("/v1/AllInstructor",AllInstructors)
const { ResetPasswordToken, ResetPassword } = require("./controllers/ResetPassword")
app.post("/v1/auth/reset-password-token", ResetPasswordToken)
app.post("/reset-password", ResetPassword)
app.listen(PORT, (req, res) => {
    return console.log(`app is working on port ${PORT}`)

})
