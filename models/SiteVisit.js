const mongoose = require('mongoose');

const SiteVisitSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    trim: true
  },
  month: {
    type: Date,
    required: true
  },
  visitCount: {
    type: Number,
    default: 0
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SiteVisit', SiteVisitSchema);
