const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserActivity', UserActivitySchema);
