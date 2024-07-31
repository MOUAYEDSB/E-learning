const mongoose = require('mongoose');
const User = require('./modeleUser');

const enfantSchema = new mongoose.Schema({
  systemeScolaire: { type: String, enum: ['Tunisien', 'Canadien', 'Francais'], required: true },
  groupes: [{ type: String, ref: 'Groupe' }],
  parents: [{ type: String, ref: 'User' }]
});

const Enfant = User.discriminator('Enfant', enfantSchema);

module.exports = Enfant;
