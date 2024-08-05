const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: "false",
    auth: {
        user: "jover8500@gmail.com",
        pass: "miglfniyskwjcjqq"
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendEmail = async (to) => {
    const mailOptions = {
        from: "The Eccomerce Shit",
        to,
            subject: "Your Order is Shit kill yourself",
            text: "Fuck you eat my cock you piece of shit"
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail }