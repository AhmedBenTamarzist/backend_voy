const express = require('express');
const router = express.Router();
const volController = require('../Controlleur/VolControlleur'); // Correct import for volController

// Search vols with filters
router.get('/vols/search', volController.searchVols); // Ensure this path doesn't conflict with other routes

// Get all vols
router.get('/vols', volController.getAllVols);

// Get a single vol by ID
router.get('/vols/:id', volController.getVolById);

// Create a new vol
router.post('/vols', volController.createVol);

// Update a vol
router.put('/vols/:id', volController.updateVol);

// Delete a vol
router.delete('/vols/:id', volController.deleteVol);

module.exports = router;
