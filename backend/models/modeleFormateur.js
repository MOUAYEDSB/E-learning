const mongoose = require('mongoose');
const User = require('./modeleUser');

const formateurSchema = new mongoose.Schema({
  titre: String,
  bio: String
});

const modeleFormateur = User.discriminator('Formateur', formateurSchema); 

module.exports = modeleFormateur ;
