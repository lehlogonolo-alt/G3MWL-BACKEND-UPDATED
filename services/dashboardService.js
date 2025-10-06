const Patient = require('../models/Patient');
const SideEffect = require('../models/SideEffect');

async function getDashboardData() {
  try {
    const totalPatients = await Patient.countDocuments();
    const sideEffectCount = await SideEffect.countDocuments();

    const weights = await Patient.aggregate([
      { $match: { startingWeight: { $ne: null } } },
      {
        $group: {
          _id: null,
          averageStartingWeight: { $avg: '$startingWeight' }
        }
      }
    ]);

    return {
      totalPatients,
      sideEffectCount,
      averageStartingWeight: weights[0]?.averageStartingWeight || 0
    };
  } catch (err) {
    console.error('❌ Failed to fetch dashboard data:', err);
    throw new Error('Could not retrieve dashboard metrics');
  }
}

module.exports = { getDashboardData };
