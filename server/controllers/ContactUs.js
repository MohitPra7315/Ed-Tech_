const mailSender = require("../Utils/NodeAmiler");
const template = require("../mail/templates/confirmationMailMsg")



exports.ContactUs = async (req, res) => {
    try {

        // fetch data from req body 
        const { firstName, lastName, email, mobile, content } = req.body;
        // validate data 
        if (!firstName || !lastName || !email || !mobile || !content) {
            return res.status(400).json({
                success: false,
                message: "All field required"
            })
        }
        // mail send to edtecg Student want to talk with you
        try {

            const mailToEdtechresponse = await mailSender(email,
                `${firstName}+${lastName} send a msg to you`,
                content)
            //  mail send to User for confirmation the mail recived
            const confirmMailrecived = await mailSender(template)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "could not send mail to Edtech and confirmation mail to Student"
                , error: error.message
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "could not work code",
            error: error.message
        })
    }
}