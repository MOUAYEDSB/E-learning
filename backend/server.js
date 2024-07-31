const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 

const connectDB = require('./config/db.js'); // Import the connectDB function

// App config
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connecting to the database and starting the server
connectDB().then(() => {
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1); 
});

// API endpoints

