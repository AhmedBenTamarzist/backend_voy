const express = require('express');
const router = express.Router();
const airlineController = require('../Controlleur/AirlineController');

// Get all airlines
router.get('/airlines', airlineController.getAllAirlines);

// Search airlines by name
router.get('/airlines/search', airlineController.searchAirlinesByName);

// Add a new airline
router.post('/airlines', airlineController.addAirline);

// Update an airline by ID
router.put('/airlines/:id', airlineController.updateAirline);

// Delete an airline by ID
router.delete('/airlines/:id', airlineController.deleteAirline);

module.exports = router;
