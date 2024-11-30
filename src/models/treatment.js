const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        required: true
    },
    teethAffected:{
        type:[Number],
    },
    procedure:{
        type: String
    },
    dentist:{
        type: String
    },
    amountCharged:{
        type: Number
    },
    amountPaid:{
        type: Number
    },
    balance:{
        type: Number
    },
    status:{
        type: String, 
        enum:['ongoing', 'completed'], default: 'ongoing'
    },
    patientID:{
        type: Number, 
        required: true
    }
});

const Treatment = mongoose.model('Treatments', treatmentSchema);

module.exports = Treatment;