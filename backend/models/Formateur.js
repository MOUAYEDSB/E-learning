const mongoose = require('mongoose');

const formateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type_dutilisateur: {
        type: String,
        required: true
    },
    mot_de_passe: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false // Make it required if necessary
    }
});

module.exports = mongoose.model('Formateur', formateurSchema);
    