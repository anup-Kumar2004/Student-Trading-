// models/pricing.js
const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensures the username is unique
    },
    price: {
        type: Number,
        required: true
    }
});

// Create the model
const Price = mongoose.model('pricing', userSchema);

module.exports = Price;
