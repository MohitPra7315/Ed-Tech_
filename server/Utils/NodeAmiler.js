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
            from: 'Virtualclasses || Socailflue - by Mohit',
            to: `${email}`,
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
