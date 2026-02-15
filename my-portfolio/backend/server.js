const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend'); // <--- Nodemailer-ku pathila idhu
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Resend Initialize
const resend = new Resend(process.env.RESEND_API_KEY);

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

app.get('/', (req, res) => res.send('Backend is Live! 🚀'));

// --- 4. Contact Route ---
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // A. SAVE TO MONGODB (Database success)
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Step 2: Data Saved to MongoDB");

    // B. EMAIL VIA RESEND API (No network block!)
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Default test email
        to: 'ranjithdev078@gmail.com', // Unga email
        subject: `Portfolio Message from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`
      });
      console.log("🚀 Step 3: Email Sent Successfully!");
    } catch (emailError) {
      console.error("⚠️ Email Error:", emailError.message);
    }

    res.status(201).json({ success: "Message Received! ✅" });

  } catch (dbError) {
    console.error("❌ DB ERROR:", dbError);
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Running on Port ${PORT}`));