const nodeMailer = require("nodemailer")

const sendEmail = async (options)=>{

    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"tempEmailEcommerce@gmail.com",
            pass:"abcd@1234",
        }
    })

    const mailOptions = {
        from:"tempEmailEcommerce@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail