const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema ({
    procedure: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['treatment1', 'treatment2']
    }

});

const Service = mongoose.model('Services', serviceSchema);

module.exports = Service;