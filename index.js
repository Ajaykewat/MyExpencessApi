






// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use the routes
app.use('/transactions', transactionRoutes);
app.use('/users', userRoutes);  

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


