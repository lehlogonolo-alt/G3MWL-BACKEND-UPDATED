const WeeklyReport = require('../models/WeeklyReport');

exports.createReport = async (data) => {
  try {
    const report = new WeeklyReport(data);
    await report.save();
    return report;
  } catch (err) {
    console.error('❌ Failed to create report:', err);
    throw new Error('Could not create report');
  }
};

exports.getReportsByPatient = async (patientId) => {
  try {
    return await WeeklyReport.find({ patientId }).sort({ weekNumber: 1 });
  } catch (err) {
    console.error('❌ Failed to fetch reports:', err);
    throw new Error('Could not retrieve reports');
  }
};

exports.updateReport = async (id, data) => {
  try {
    await WeeklyReport.findByIdAndUpdate(id, data, { new: true });
    return { message: 'Report updated' };
  } catch (err) {
    console.error('❌ Failed to update report:', err);
    throw new Error('Could not update report');
  }
};

exports.deleteReport = async (id) => {
  try {
    await WeeklyReport.findByIdAndDelete(id);
  } catch (err) {
    console.error('❌ Failed to delete report:', err);
    throw new Error('Could not delete report');
  }
};

