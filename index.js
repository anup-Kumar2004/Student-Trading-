// server.js or app.js

require('dotenv').config();  // Load environment variables from .env file
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection using mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

app.use(express.static('public'));

// models
const User = require('./models/user.js');
const UserPrice = require('./models/pricing.js');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
});

app.post('/status', async (req, res) => {
    const { username, password} = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('User not found.');
        }

        if (user.password !== password) {
            return res.status(401).send('Incorrect password.');
        }

        const userprice = await UserPrice.findOne({ username });

        res.send(`Hello, ${username}! Your price is ${userprice.price}`);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error.');
    }
});

app.post('/', async (req, res) => {
    const { username, password, price} = req.body; // Extract username and password from form data

    // Create a new user instance
    const newUser = new User({
        username,
        password
    });

    const newPrice = new UserPrice({
        username,
        price
    });

    try {
        // Save the user to the database
        await newUser.save();
        await newPrice.save();
        console.log('User saved:', newUser);
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
