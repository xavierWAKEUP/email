const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <form action="/" method="post">
      <input type="email" name="email" placeholder="Recipient's email">
      <input type="text" name="subject" placeholder="Subject">
      <textarea name="message" placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  `);
});

app.post("/", (req, res) => {
  const { email, subject, message } = req.body;
  sendEmail(email, subject, message, (error) => {
    if (error) {
      res.send("An error occurred");
      return;
    }
    res.send("Email sent successfully");
  });
});

const sendEmail = (email, subject, message, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "xavierwakeup@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "xavierwakeup@gmail.com",
    to: email,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, callback);
};

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
