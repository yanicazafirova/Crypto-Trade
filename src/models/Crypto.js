const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: [/^https?:\/\//i, 'Image URL should start with http/https!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [1, 'Price should be a positive number'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be a minimum of 10 characters long!'],
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
    },
    buyCrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;