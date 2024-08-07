const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.get("/",(request,response)=>{
    response.send("API working");
})


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Connection error:', error));

// Import routes
const userRouter = require('./routes/userRoutes');
const groupeRouter = require('./routes/groupeRoutes');

// Use routes
app.use('/api/user', userRouter);
app.use('/api/groupes', groupeRouter);

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
