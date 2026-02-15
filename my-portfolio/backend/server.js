const dns = require('dns');            
dns.setDefaultResultOrder('ipv4first'); 

const express = require('express');    
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

// --- 4. Contact Route (Final Logic) ---
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    console.log("📩 Step 1: Request Received");

    // A. SAVE TO MONGODB (Priority 1)
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Step 2: Data Saved to MongoDB");

    // B. EMAIL LOGIC (Priority 2 - Wrapped in a separate try-catch)
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        localAddress: '0.0.0.0', 
        family: 4,               
        tls: { rejectUnauthorized: false },
        connectionTimeout: 15000 // 15 seconds limit
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

    } catch (emailError) {
      // Email fail aanalum, inga catch aayidum. Server crash aagadhu.
      console.error("⚠️ Email sending failed, but data is safe in DB:", emailError.message);
    }

    // Always send success if DB save is done
    res.status(201).json({ success: "Message Received! ✅" });

  } catch (dbError) {
    console.error("❌ DATABASE ERROR:", dbError);
    res.status(500).json({ error: "Server Error. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});