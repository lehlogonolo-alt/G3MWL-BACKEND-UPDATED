const mongoose = require('mongoose');

const WeeklyReportSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  weight: Number,
  dosage: String,
  sideEffects: [String],
  results: String,
  notes: String,
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeeklyReport', WeeklyReportSchema);
