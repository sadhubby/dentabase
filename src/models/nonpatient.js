const mongoose = require('mongoose');

const NonPatientAppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: {type: Number, required: true},    
    effectiveDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
});

module.exports = mongoose.model('NonPatientAppointment', NonPatientAppointmentSchema);
