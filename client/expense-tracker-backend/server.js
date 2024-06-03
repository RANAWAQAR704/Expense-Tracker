// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path as needed
const Expense = require('./models/Expense'); // Adjust the path as needed
const Income = require('./models/Income'); // Adjust the path as needed
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'TqG9ZoXBoK';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

// Add Expense
app.post('/expense', verifyToken, async (req, res) => {
  const { amount, description } = req.body;
  const userId = req.user.id;

  try {
    const expense = new Expense({ userId, amount, description });
    await expense.save();
    res.status(201).send('Expense added');
  } catch (error) {
    res.status(500).send('Error adding expense');
  }
});

// Add Income
app.post('/income', verifyToken, async (req, res) => {
  const { amount, description } = req.body;
  const userId = req.user.id;

  try {
    const income = new Income({ userId, amount, description });
    await income.save();
    res.status(201).send('Income added');
  } catch (error) {
    res.status(500).send('Error adding income');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
