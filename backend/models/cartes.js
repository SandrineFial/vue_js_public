// Importation de mongoose
const mongoose = require('mongoose');

// Définition du schéma Mongoose
const CartesSchema = new mongoose.Schema({
    recipient: {
        type: String,
        required: true,
        trim: true, // Supprime les espaces inutiles
    },
    age: {
        type: Number,
        required: true,
        min: 6,  // Validation pour l'âge minimal
    },
    sender: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide'], // Validation du format email
    },
    club: {
        type: String,
        required: false,  // Optionnel
        trim: true,
    },
    currentDate: {
        type: Date,
        required: true,
        default: Date.now, // Définit la date actuelle par défaut
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    card_title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,  // Le prix ne peut pas être négatif
    },
    paye: {
        type: Number,
        min: 0,
        max: 1,
    }
});

// Création du modèle basé sur le schéma
const Cartes = mongoose.model('Cartes', CartesSchema);

// Exportation du modèle pour l'utiliser dans l'application
module.exports = Cartes;
