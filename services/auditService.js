const UserActivity = require('../models/UserActivity');

async function getLastActivity(email) {
  try {
    const last = await UserActivity.findOne({ userEmail: email })
      .sort({ timestamp: -1 })
      .select('action timestamp');

    return last ? `${last.action} at ${last.timestamp}` : 'No activity recorded';
  } catch (err) {
    console.error('❌ Failed to fetch last activity:', err);
    throw new Error('Could not retrieve last activity');
  }
}

async function getRecentActivities(count) {
  try {
    return await UserActivity.find({})
      .sort({ timestamp: -1 })
      .limit(count);
  } catch (err) {
    console.error('❌ Failed to fetch recent activities:', err);
    throw new Error('Could not retrieve recent activities');
  }
}

module.exports = { getLastActivity, getRecentActivities };

