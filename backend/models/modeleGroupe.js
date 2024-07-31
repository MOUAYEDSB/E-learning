const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupeSchema = new Schema({
  group_id: { type: String, required: true, unique: true },
  nom: String,
  trancheAge: String,
  description: String,
  formateur_id: { type: String, ref: 'User', required: true },
  enfants_id: [{ type: String, ref: 'User' }]
});

const Groupe = mongoose.model('Groupe', groupeSchema);
module.exports = Groupe; 

