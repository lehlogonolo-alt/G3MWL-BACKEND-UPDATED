const UserActivity = require('../models/UserActivity');

async function logActivity(req, res) {
  const { action } = req.body;
  const email = req.user?.email;

  if (!email || !action) {
    return res.status(400).json({ error: 'User email and action are required' });
  }

  try {
    const activity = new UserActivity({
      userEmail: email,
      action,
      timestamp: new Date()
    });

    await activity.save();
    res.status(201).json({ message: 'Activity logged' });
  } catch (err) {
    console.error('❌ Failed to log activity:', err);
    res.status(500).json({ error: 'Failed to log activity', details: err.message });
  }
}

module.exports = { logActivity };

