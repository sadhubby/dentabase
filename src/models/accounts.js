const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    accountID: {
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

const Account = mongoose.model('Accounts', accountSchema);

module.exports = Account;
