// models/User.js
const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures the username is unique
    },
    password: {
        type: String,
        required: true
    }
});

// Create the model
const User = mongoose.model('users', userSchema);

module.exports = User;
