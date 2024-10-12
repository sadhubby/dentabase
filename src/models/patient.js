const mongoose = require('mongoose');
const treatment = require('./treatment');

const patientSchema = new mongoose.Schema({
    patientID:{
        type: Number,
        required: true,
        unique: true
    },
    patientPic:{
        type: String,
        require: true,
        default: "https://i.sstatic.net/l60Hf.png"
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
    patientTreatments:[treatment.schema]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;