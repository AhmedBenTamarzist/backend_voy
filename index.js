const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();
const airportRoutes = require('./Routes/airportRoutes');
const airlineRoutes = require('./Routes/airlineRoutes');
const volRoutes = require('./Routes/volRoutes');



const userRoutes = require('./Routes/userRoutes');
const connectDB = require('./Connection/connection');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
// Connexion à la base de données
connectDB();
const app = express();
app.use(cors());

// Middleware pour analyser les données JSON
app.use(express.json());

// Add middleware for new routes
app.use('/api', airportRoutes);
app.use('/api', airlineRoutes);
app.use('/api', volRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});


app.use('/api', userRoutes);
app.use(session({
  secret: process.env.JWT_SECRET,  // Utilisez une clé secrète pour sécuriser les sessions
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Assurez-vous que secure est false pour les environnements locaux non HTTPS
}));

// Initialiser Passport.js
app.use(passport.initialize());
app.use(passport.session());
// Définir le port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
const path = require('path');

// Serve static files (for photos or other assets)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

