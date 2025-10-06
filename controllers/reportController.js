const reportService = require('../services/reportService');

exports.createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    console.error('❌ Failed to create report:', err);
    res.status(500).json({ error: 'Failed to create report', details: err.message });
  }
};

exports.getReportsByPatient = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Patient ID is required' });
  }

  try {
    const reports = await reportService.getReportsByPatient(id);
    res.json(reports);
  } catch (err) {
    console.error('❌ Failed to fetch reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports', details: err.message });
  }
};

exports.updateReport = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Report ID is required' });
  }

  try {
    const updated = await reportService.updateReport(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to update report:', err);
    res.status(500).json({ error: 'Failed to update report', details: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Report ID is required' });
  }

  try {
    await reportService.deleteReport(id);
    res.json({ message: 'Report deleted' });
  } catch (err) {
    console.error('❌ Failed to delete report:', err);
    res.status(500).json({ error: 'Failed to delete report', details: err.message });
  }
};

