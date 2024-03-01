// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;



// MongoDB connection
const connectDB = require('./db');
connectDB(); // Connect to MongoDB


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const user = require('./routes/user');
app.use('/api', user);

// Error handling middleware
const errorMiddleware = require('./middlewares/error');
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
