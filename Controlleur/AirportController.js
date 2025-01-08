const Airport = require('../Model/AirportModel');

// Get all airports
exports.getAllAirports = async (req, res) => {
    try {
        const airports = await Airport.find();
        res.status(200).json(airports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch airports' });
    }
};
// Add a new airport
exports.addAirport = async (req, res) => {
    try {
        const newAirport = new Airport(req.body);
        const savedAirport = await newAirport.save();
        res.status(201).json(savedAirport);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add airport', details: error.message });
    }
};

// Update an airport by ID
exports.updateAirport = async (req, res) => {
    try {
        const updatedAirport = await Airport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAirport) return res.status(404).json({ message: 'Airport not found' });
        res.status(200).json(updatedAirport);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update airport', details: error.message });
    }
};

// Delete an airport by ID
exports.deleteAirport = async (req, res) => {
    try {
        const deletedAirport = await Airport.findByIdAndDelete(req.params.id);
        if (!deletedAirport) return res.status(404).json({ message: 'Airport not found' });
        res.status(200).json({ message: 'Airport deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete airport', details: error.message });
    }
};



// Search airports by name
exports.searchAirportsByName = async (req, res) => {
    try {
        const { name } = req.query; // e.g., /airports/search?name=JFK
        const airports = await Airport.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
        res.status(200).json(airports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search airports by name' });
    }
};
