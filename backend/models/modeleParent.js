const mongoose = require('mongoose');
const User = require('./modeleUser');

const parentSchema = new mongoose.Schema({
  enfants_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enfant' }]
}, { discriminatorKey: 'role' });

const Parent = User.discriminator('Parent', parentSchema);

module.exports = Parent;
