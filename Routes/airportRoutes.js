const express = require('express');
const router = express.Router();
const airportController = require('../Controlleur/AirportController');

// Get all airports
router.get('/airports', airportController.getAllAirports);

// Search airports by name
router.get('/airports/search', airportController.searchAirportsByName);

// Add a new airport
router.post('/airports', airportController.addAirport);

// Update an airport by ID
router.put('/airports/:id', airportController.updateAirport);

// Delete an airport by ID
router.delete('/airports/:id', airportController.deleteAirport);

module.exports = router;
