const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientID:{
        type: Number,
        required: true,
        unique: true
    },
    patientName:{
        type: String,
        required: true
    },
    patientContact:{
        type: Number,
        require: true
    },
    patientEmail:{
        type: String,
        required: true
    },
    patientTreatments:[Treatment.schema]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;