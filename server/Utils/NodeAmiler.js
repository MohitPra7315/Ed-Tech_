const nodemailer = require("nodemailer")
require("dotenv").config()
const mailSender = async (email, title, body) => {
    console.log("email for mail for check", email)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.Mail_host,
            auth: {
                user: process.env.Mail_User,
                pass: process.env.Mail_Pass
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
        console.error(error.message)
        console.error("Mail sender faat rha h ")
    }

}
module.exports = mailSender
