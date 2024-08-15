const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    time: { type: String, required: true }, // e.g., '14:00'
    group_id: { type: Schema.Types.ObjectId, ref: 'Groupe', required: true }
  });
  
  const Session = mongoose.model('Session', sessionSchema);
  module.exports = Session;