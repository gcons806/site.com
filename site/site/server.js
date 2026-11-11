require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/contact", async (req, res) => {
  const { name, email, phone = "", projectType, message } = req.body || {};
  if (!name || name.trim().length < 2 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !projectType || !message || message.trim().length < 10) {
    return res.status(400).json({ message: "Please complete all required fields with valid details." });
  }

  // SMTP settings are optional for local preview. Add them to .env to receive enquiries by email.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) {
    console.log("NEW WEBSITE ENQUIRY", { name, email, phone, projectType, message });
    return res.json({ message: "Thank you! Your enquiry was received by the website backend." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New website enquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject type: ${projectType}\n\nMessage:\n${message}`
    });
    return res.json({ message: "Thank you! Your enquiry has been sent successfully." });
  } catch (err) {
    console.error("Email delivery failed:", err.message);
    return res.status(500).json({ message: "Your enquiry could not be emailed right now. Please try again or contact us directly." });
  }
});

app.listen(PORT, () => console.log(`VERTEX website running at http://localhost:${PORT}`));
