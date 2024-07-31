const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { discriminatorKey: 'role', collection: 'users' };

const userSchema = new Schema({
  nom: String,
  prenom: String,
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  adresse: String,
  telephone: String,
  profileImgURL: String,
  age: Number,
  role: { type: String, enum: ['formateur', 'admin', 'enfant', 'parent'], required: true }
}, options);

const User = mongoose.model('User', userSchema);

module.exports = User ;
