const mongoose = require('mongoose');
const User = require('./modeleUser');

const formateurSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  bio: { type: String, required: true }
}, { discriminatorKey: 'role' });

const Formateur = User.discriminator('Formateur', formateurSchema);

module.exports = Formateur;
