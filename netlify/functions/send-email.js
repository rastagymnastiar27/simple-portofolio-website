// netlify/functions/send-email.js
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    // Only handle POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, email, subject, message } = JSON.parse(event.body);

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: "Gmail", // or another email service
        auth: {
            user: process.env.EMAIL_USER, // email service login
            pass: process.env.EMAIL_PASS, // email service password
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.RECIPIENT_EMAIL, // your receiving email
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: "Email sent successfully" };
    } catch (error) {
        console.error("Email sending error:", error);
        return { statusCode: 500, body: "Failed to send email" };
    }
};
