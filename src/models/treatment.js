const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({

    treatmentName: {
        type: String,
        required: true
    },
    treatmentDate:{
        type: Date,
        required: true
    },
    status:{
        type: String, 
        enum:['ongoing', 'completed'], default: 'ongoing'
    }

});

module.exports = mongoose.model('Treatments', treatmentSchema);