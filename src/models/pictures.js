const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    fileName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    caption:{
        type: String
    },
    patientID:{
        type: Number,
        required: true
    }
})

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;