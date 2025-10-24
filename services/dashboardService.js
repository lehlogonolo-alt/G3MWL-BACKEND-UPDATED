const Patient = require('../models/Patient');
const WeeklyReport = require('../models/WeeklyReport');
const SideEffect = require('../models/SideEffect');

async function getDashboardData() {
  try {
    console.log('📊 Starting dashboard data aggregation...');

    const totalPatients = await Patient.countDocuments();
    const sideEffectCount = await SideEffect.countDocuments();
    console.log(`👥 Total patients: ${totalPatients}`);
    console.log(`💊 Total side effects: ${sideEffectCount}`);

    const patients = await Patient.find({});
    let totalPercentageLost = 0;
    let patientsWithWeightLoss = 0;

    for (const patient of patients) {
      if (!patient.startingWeight || patient.startingWeight <= 0) {
        console.log(`⚠️ Skipping patient ${patient._id} due to invalid starting weight: ${patient.startingWeight}`);
        continue;
      }

      const latestReport = await WeeklyReport.findOne({
        patientId: patient._id,
        weight: { $ne: null }
      }).sort({ weekNumber: -1 });

      if (latestReport && latestReport.weight > 0) {
        const weightLost = patient.startingWeight - latestReport.weight;
        const percentageLost = (weightLost / patient.startingWeight) * 100;
        totalPercentageLost += percentageLost;
        patientsWithWeightLoss++;

        console.log(`✅ Patient ${patient._id}: Start ${patient.startingWeight} → Latest ${latestReport.weight} → Lost ${percentageLost.toFixed(1)}%`);
      } else {
        console.log(`⚠️ No valid report found for patient ${patient._id}`);
      }
    }

    const averageWeightLossPercentage = patientsWithWeightLoss > 0
      ? parseFloat((totalPercentageLost / patientsWithWeightLoss).toFixed(1))
      : 0;

    console.log(`📈 Average weight loss: ${averageWeightLossPercentage}% across ${patientsWithWeightLoss} patients`);

    return {
      totalPatients,
      sideEffectCount,
      averageWeightLossPercentage
    };
  } catch (err) {
    console.error('❌ Failed to fetch dashboard data:', err);
    throw new Error('Could not retrieve dashboard metrics');
  }
}

module.exports = { getDashboardData };




