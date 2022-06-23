// Send Email is not working due to Google Services

const nodeMailer = require("nodemailer")

const sendEmail = async (options)=>{

    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure: true,
        service:"gmail",
        auth:{
            user:"tempEmailEcommerce@gmail.com",
            pass:"app password",
        }
    })
    // App Password: uwalrlngdlgqylxb  |  Gmail password: ab@12cd34

    const mailOptions = {
        from:"tempEmailEcommerce@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail