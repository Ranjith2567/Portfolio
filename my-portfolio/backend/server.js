require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// --- 4. Contact Route (Storage only) ---
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    console.log("📩 Request Received for:", name);

    // SAVE TO MONGODB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    
    console.log("✅ Data Saved to MongoDB Successfully!");
    res.status(201).json({ success: "Message Saved in DB! ✅" });

  } catch (dbError) {
    console.error("❌ DATABASE ERROR:", dbError);
    res.status(500).json({ error: "Server Error. Could not save data." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});