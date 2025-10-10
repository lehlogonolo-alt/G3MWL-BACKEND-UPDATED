const express = require('express');
const router = express.Router();
const { getLastActivity, getRecentActivities } = require('../services/auditService');
const auth = require('../middleware/auth');

// GET /api/activity/lastActivity?email=...
router.get('/lastActivity', auth, async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const result = await getLastActivity(email);
    res.json(result); // returns formatted string
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch last activity', details: err.message });
  }
});

// GET /api/activity/recent?count=5
router.get('/recent', auth, async (req, res) => {
  const count = parseInt(req.query.count) || 5;

  try {
    const activities = await getRecentActivities(count);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent activities', details: err.message });
  }
});

module.exports = router;




