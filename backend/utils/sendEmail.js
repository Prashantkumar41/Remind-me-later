const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(message) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Can be dynamic per user
      subject: "Your Reminder",
      text: message,
    });
    console.log("Email sent:", message);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

module.exports = sendEmail;
