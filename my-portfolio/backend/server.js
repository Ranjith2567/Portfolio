const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Cloud MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("🔥 Cloud MongoDB Atlas Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// --- ADD THIS HOME ROUTE TO FIX "CANNOT GET /" ---
app.get('/', (req, res) => {
  res.send('Backend Server is Running Mass! 🚀');
});

// 3. API Route with Email Alert
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // A. MongoDB Atlas-la save panradhu
    const newContact = new Contact({ name, email, message });
    await newContact.save();

// B. Email Alert Logic (Nodemailer)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Port 587-ku idhu false-a irukkanum
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
      },
      tls: {
        rejectUnauthorized: false // Extra safety for Render
      },
      family: 4 // <--- IDHU DHAAN MUKKIYAM (Forces IPv4)
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, 
      subject: `New Portfolio Message from ${name}`,
      text: `Got a new message!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ success: "Message Saved & Email Sent! ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error ❌" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});