const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },

    vinCode: {
        type: String,
        required: true,
        trim: true
    },

    color: {
        type: String,
        required: true,
        trim: true,
        default: 'black'
    },
    year: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('Car', carSchema);
