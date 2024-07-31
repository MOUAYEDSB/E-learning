const mongoose = require('mongoose');
const User = require('./modeleUser');

const parentSchema = new mongoose.Schema({
  enfants_id: [{ type: String, ref: 'User' }]
});

const modeleParent = User.discriminator('Parent', parentSchema); 

module.exports = modeleParent;
