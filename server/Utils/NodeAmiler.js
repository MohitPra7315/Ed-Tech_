const nodemailer = require("nodemailer")
require("dotenv").config()
const mailSender = async (email, title, body) => {
    console.log("email for mail for check", email)
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'mohitprajapati14101998@gmail.com',
                pass: 'nxckrhzadtnutvlh'
            }
        })
        let info = await transporter.sendMail({
<<<<<<< HEAD
            from: 'StudyNotion || CodeHelp - by Babbar',
=======
            from: 'Virtualclasses || Socailflue - by Mohit',
>>>>>>> 11c233078fee4c77d0803b95ea12528abe9eeeb9
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log("tranporter initiall a Info ", info)
        return info
    } catch (error) {
        console.error(error.message)
        console.error("Mail sender faat rha h ")
    }

}
module.exports = mailSender
