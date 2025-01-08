const Vol = require('../Model/modelVol');

// Get all vols
exports.getAllVols = async (req, res) => {
    try {
        const vols = await Vol.find()
            .populate('villeDepart') // Replace villeDepart ID with the full Airport object
            .populate('villeArrivee') // Replace villeArrivee ID with the full Airport object
            .populate('compagnieAerienne');
        res.status(200).json(vols);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Get a single vol by ID
exports.getVolById = async (req, res) => {
    try {
        const vol = await Vol.findById(req.params.id);
        if (!vol) return res.status(404).json({ message: 'Vol non trouvé' });
        res.status(200).json(vol);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Create a new vol
exports.createVol = async (req, res) => {
    try {
        const newVol = new Vol(req.body);
        const savedVol = await newVol.save();
        res.status(201).json(savedVol);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création', error });
    }
};

// Update a vol
exports.updateVol = async (req, res) => {
    try {
        const updatedVol = await Vol.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVol) return res.status(404).json({ message: 'Vol non trouvé' });
        res.status(200).json(updatedVol);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour', error });
    }
};

// Delete a vol
exports.deleteVol = async (req, res) => {
    try {
        const deletedVol = await Vol.findByIdAndDelete(req.params.id);
        if (!deletedVol) return res.status(404).json({ message: 'Vol non trouvé' });
        res.status(200).json({ message: 'Vol supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
// Search vols with filters
exports.searchVols = async (req, res) => {
    try {
        const { villeDepart, villeArrivee, dateDepart, classe, escales } = req.query;

        // Build the search query
        const query = {};

        if (villeDepart) query.villeDepart = villeDepart; // Must be an ObjectId
        if (villeArrivee) query.villeArrivee = villeArrivee; // Must be an ObjectId
        if (dateDepart) query.dateDepart = new Date(dateDepart); // Exact date match
        if (classe) query.classe = classe; // Match specified class
        if (escales) {
            query.escales = {
                $elemMatch: { airport: escales }, // Escale airport must match an ObjectId
            };
        }

        // Find vols based on the query
        const vols = await Vol.find(query)
            .populate('villeDepart', 'name code city country') // Include detailed airport info
            .populate('villeArrivee', 'name code city country')
            .populate('compagnieAerienne', 'name iataCode country')
            .populate('escales.airport', 'name code city country');

        res.status(200).json(vols);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search vols' });
    }
};