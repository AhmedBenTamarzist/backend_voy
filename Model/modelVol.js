





const mongoose = require('mongoose');

const VolSchema = new mongoose.Schema({
    villeDepart: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport', required: true },
    villeArrivee: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport', required: true },
    dateDepart: { type: Date, required: true },
    dateArrivee: { type: Date, required: true },
    prix: { type: Number, required: true },
    compagnieAerienne: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline', required: true },
    nombrePlaces: { type: Number, required: true },
    description: { type: String },
    photos: [{ type: String }],
    classe: { type: String, enum: ['Economique', 'Affaires', 'Première'], default: 'Economique' },
    escales: [
        {
            airport: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport' },
            duration: { type: Number }, // Duration in minutes
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Vol', VolSchema);
