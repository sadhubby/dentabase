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
    }
})

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;