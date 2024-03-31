// Backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// In a real-world scenario, you would use a database like MongoDB or PostgreSQL
const users = [];

// Secret key for JWT token
const JWT_SECRET = 'your_secret_key';

// Endpoint for user sign-up
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('An error occurred during sign-up');
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ username }, JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('An error occurred during login');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
