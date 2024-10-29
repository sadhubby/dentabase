const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({ //if no patientID found, don't display checked boxes
    patientID:{
        type: Number,
        required: true
    },
    physicianName: {
        type: String
    },
    physicianOfficeAddress: {
        type: String
    },
    physicianSpecialty: {
        type: String
    },
    physicianOfficeNumber: {
        type: Number
    },
    prescription:{
        type: String
    },
    illnessOrSurgery:{
        type: String
    },
    condition:{
        type: String
    },
    isUsingTobacco:{
        type: Boolean
    },
    isAlcoholOrDrugs:{
        type: Boolean
    },
    allergies:{
        type: [String]
    },
    isPregnant:{
        type: Boolean
    },
    isNursing:{
        type: Boolean
    },
    isBirthControlPills:{
        type: Boolean
    },
    healthProblems:{
        type: [String]
    }
})

const MedicalHistory = mongoose.model('Medical History', medicalHistorySchema);

module.exports = MedicalHistory;