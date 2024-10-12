const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    accountId: {
        type: Number,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        required: true
    },
    accountOwnerName: {
        type: String,
        required: true
    },
    accountUserName: {
        type: String,
        required: true
    },
    accountPass: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Accounts', accountSchema);