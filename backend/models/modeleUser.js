const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
  role: { type: String, enum: ['formateur', 'enfant', 'parent'], required: true }
}, options);

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (this.isModified('motdepasse')) {
    this.motdepasse = await bcrypt.hash(this.motdepasse, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.motdepasse);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};


const User = mongoose.model('User', userSchema);

module.exports = User;