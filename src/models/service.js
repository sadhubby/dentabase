const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema ({
    service: {
        type: String,
        required: true,
        enum: ['Oral Prophylaxis', 'Tooth Filling', 'Braces', 'Tooth Extraction', 'Wisdom Tooth Removal', 'Dentures', 'Jacket Crowns', 'Tooth Whitening']
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