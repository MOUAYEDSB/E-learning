const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupeSchema = new Schema({
  nom: { type: String, required: true },
  trancheAge: { type: String, required: true },
  description: { type: String },
  formateur_id: { type: Schema.Types.ObjectId, ref: 'Formateur', required: true },
  enfants_id: [{ type: Schema.Types.ObjectId, ref: 'Enfant', required: true }]
});

const Groupe = mongoose.model('Groupe', groupeSchema);

module.exports = Groupe;
