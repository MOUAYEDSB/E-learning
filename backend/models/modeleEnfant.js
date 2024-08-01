const mongoose = require('mongoose');
const User = require('./modeleUser');

const enfantSchema = new mongoose.Schema({
  systemeScolaire: { type: String, enum: ['Tunisien', 'Canadien', 'Francais'], required: true },
  groupes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groupe' }],
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }]
});

const Enfant = User.discriminator('Enfant', enfantSchema);

module.exports = Enfant;

