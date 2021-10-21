const mongoose = require('mongoose')
const Schema = mongoose.Schema

const City = new Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('cities', City)
