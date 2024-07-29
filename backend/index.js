require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Add path for serving static files

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Routes
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const formateurRouter = require('./routes/formateur');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/formateurs', formateurRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
