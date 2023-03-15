// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const books = require('./routes/api/books');
const users = require('./routes/api/users');

const app = express();

connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/books', books);
app.use('/api/users', users);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));