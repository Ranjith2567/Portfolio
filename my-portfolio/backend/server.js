const dns = require('dns');            // <--- Line 1 (New)
dns.setDefaultResultOrder('ipv4first'); // <--- Line 2 (THE FIX!)

const express = require('express');    // <--- Apram dhaan mathadhu varanum
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ... (Meethi code ellam appadiye irukkattum, maatha vendam)

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Cloud MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// --- 2. Schema ---
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// --- 3. Home Route ---
app.get('/', (req, res) => {
  res.send('Backend is Live & Running! 🚀');
});

// --- 4. Contact Route (With IPv4 Fix) ---
app.post('/api/contact', async (req, res) => {
  try {
    console.log("📩 Step 1: Request Received");
    const { name, email, message } = req.body;

    // A. Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Step 2: Data Saved to MongoDB");

    // B. Email Alert Logic (IPv4 FORCED)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // INDHA RENDU LINE ROMBA MUKKIYAM 👇
      localAddress: '0.0.0.0', // Forces IPv4 binding
      family: 4,               // Forces IPv4 resolution
      
      tls: {
        rejectUnauthorized: false
      }
    });
    
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message: ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`
    };

    console.log("📤 Step 3: Attempting to Send Email...");
    await transporter.sendMail(mailOptions);
    console.log("🚀 Step 4: Email Sent Successfully!");

    res.status(201).json({ success: "Message Saved & Email Sent! ✅" });

  } catch (error) {
    console.error("❌ ERROR DETECTED:", error);
    // Error vandhalum, Database save aagi irundha 'Partial Success' nu sollam
    res.status(500).json({ error: "Failed to send email, but data saved! ⚠️" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});