const mongoose = require('mongoose');

const AirlineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    iataCode: { type: String, required: true }, // Airline code (e.g., "AF")
    country: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Airline', AirlineSchema);
