const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./Routes/Routes');
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

// Routes des utilisateurs
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

