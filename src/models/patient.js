const mongoose = require('mongoose');
const treatment = require('./treatment');

const patientSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    middleName:{
        type: String,
    },
    nickname:{
        type: String
    },
    homeAddress:{
        type: String
    },  
    birthdate:{
        type: Date,
        required: true
    },
    age:{ //make dynamic maybe
        type: Number,
        required: true
    },
    sex:{
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    religion:{
        type: String
    },
    nationality:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    homeNo:{
        type: Number
    },
    occupation:{
        type: String,
        required: true
    },
    dentalInsurance:{
        type: String
    },
    officeNo:{
        type: Number
    },
    faxNo:{
        type: Number
    },
    contact:{
        type: String,
        required: true
    },
    effectiveDate:{ //idk what this means
        type: Date
    },
    guardianName:{
        type: String
    },
    guardianOccupation:{
        type: String
    },
    referralName:{
        type: String
    },
    consultationReason:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    lastDentist:{
        type: String
    },
    lastDentalVisit:{
        type: Date
    },
    
    
    pic:{
        type: String,
        required: true,
        default: "https://i.sstatic.net/l60Hf.png"
    },
    treatments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Treatments'}]

    
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

