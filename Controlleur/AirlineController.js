const Airline = require('../Model/AirlineModel');

// Get all airlines
exports.getAllAirlines = async (req, res) => {
    try {
        const airlines = await Airline.find();
        res.status(200).json(airlines);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch airlines' });
    }
};

// Add a new airline
exports.addAirline = async (req, res) => {
    try {
        const newAirline = new Airline(req.body);
        const savedAirline = await newAirline.save();
        res.status(201).json(savedAirline);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add airline', details: error.message });
    }
};

// Update an airline by ID
exports.updateAirline = async (req, res) => {
    try {
        const updatedAirline = await Airline.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAirline) return res.status(404).json({ message: 'Airline not found' });
        res.status(200).json(updatedAirline);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update airline', details: error.message });
    }
};

// Delete an airline by ID
exports.deleteAirline = async (req, res) => {
    try {
        const deletedAirline = await Airline.findByIdAndDelete(req.params.id);
        if (!deletedAirline) return res.status(404).json({ message: 'Airline not found' });
        res.status(200).json({ message: 'Airline deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete airline', details: error.message });
    }
};


// Search airlines by name
exports.searchAirlinesByName = async (req, res) => {
    try {
        const { name } = req.query; // e.g., /airlines/search?name=Air
        const airlines = await Airline.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
        res.status(200).json(airlines);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search airlines by name' });
    }
};
