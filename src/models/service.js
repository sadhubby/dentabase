const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema ({
    service: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Ortho', 'Non-Ortho']
    }

});

const Service = mongoose.model('Services', serviceSchema);

module.exports = Service;