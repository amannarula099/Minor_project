const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  location: String,
  guest: Number,
  Start: Date,
  End: Date
});

module.exports = mongoose.model('User', userSchema);
