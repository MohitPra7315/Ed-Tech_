const nodemailer = require("nodemailer")
require("dotenv").config()
const mailSender = async (email, title, body) => {
    try {

        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            auth: {
                user:'mohitprajapati14101998@gmail.com',
                pass: 'nxckrhzadtnutvlh'
            }
        })

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Babbar',
            to:`mohitprajapati7315@gmail.com`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log("tranporter initiall a Info ", info)
        return info
    } catch (error) {
        console.log(error.message)
        console.error("Mail sender faat rha h ")
    }

}
module.exports = mailSender