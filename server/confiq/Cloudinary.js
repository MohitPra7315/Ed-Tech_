const cloudinary = require("cloudinary").v2

require("dotenv").config()



exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            //!    ########   Configuring the Cloudinary to Upload MEDIA ########
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        });
        console.log("coloudinary is wordking successfully")
    } catch (error) {
        console.log(error);
    }
};