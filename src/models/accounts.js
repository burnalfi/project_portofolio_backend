const mongoose = require('mongoose');


const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

exports.Account = mongoose.model('account', AccountSchema);