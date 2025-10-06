const dashboardService = require('../services/dashboardService');
const SiteVisit = require('../models/SiteVisit');

exports.getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardData();

    // 🔁 Auto-log site visit for G3MWL
    try {
      const currentMonth = new Date();
      const siteName = 'G3MWL';

      const visit = await SiteVisit.findOneAndUpdate(
        {
          siteName,
          month: {
            $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
            $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
          }
        },
        { $inc: { visitCount: 1 } },
        { upsert: true, new: true }
      );

      console.log('🔁 SiteVisit updated:', visit);
    } catch (logErr) {
      console.error('❌ SiteVisit logging failed:', logErr.message);
    }

    res.json(data);
  } catch (err) {
    console.error('❌ Dashboard load failed:', err.message);
    res.status(500).json({ error: 'Failed to load dashboard', details: err.message });
  }
};





