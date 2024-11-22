const mongoose = require('mongoose');

const orthodonticsSchema = new mongoose.Schema({
    patientID:{
        type: Number,
        required: true,
    },
    service:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    }

});

const Orthodontics = mongoose.model('Orthodontics', orthodonticsSchema);
module.exports = Orthodontics;