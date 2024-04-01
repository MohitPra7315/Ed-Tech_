const express = require("express");
const app = express()

const courseRoutes = require("./Routes/Course")
const userRoutes = require("./Routes/User")
const paymentRoutes = require("./Routes/Payment")
const profileRoutes = require("./Routes/profile");


const cookieParse = require("cookie-parser")
const cors = require("cors")
const fileUploader = require("express-fileupload")
const dotenv = require("dotenv")

const PORT = process.env.PORT

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

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)

const { ResetPasswordToken, ResetPassword } = require("./controllers/ResetPassword")
app.post("/api/v1/auth/reset-password-token", ResetPasswordToken)
app.post("/reset-password", ResetPassword)

app.listen(PORT, (req, res) => {
    return console.log(`app is working on port ${PORT}`)
})

