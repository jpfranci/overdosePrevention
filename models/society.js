var mongoose = require('mongoose');

var SocietySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    address: {
        type: String,
        unqiue: false,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        unique: false,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

var Society = mongoose.model("Society", SocietySchema);
module.exports = Society;