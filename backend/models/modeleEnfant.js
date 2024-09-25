const mongoose = require('mongoose');
const User = require('./modeleUser');

const enfantSchema = new mongoose.Schema({
  systemeScolaire: { type: String, enum: ['Tunisien', 'Canadien', 'Francais'], required: true },
  profileImgURLkid: String,
  groupes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groupe' }],
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }],

}, { discriminatorKey: 'role' });

const Enfant = User.discriminator('Enfant', enfantSchema);

module.exports = Enfant;
