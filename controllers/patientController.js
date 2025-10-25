const patientService = require('../services/patientService');

// Get all patients
async function getPatients(req, res) {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (err) {
    console.error('❌ Failed to fetch patients:', err);
    res.status(500).json({ error: 'Could not retrieve patients' });
  }
}

// Get a single patient by ID
async function getPatientById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Patient ID is required' });
  }

  try {
    const patient = await patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error(`❌ Failed to fetch patient by ID ${id}:`, err);
    res.status(500).json({ error: 'Could not retrieve patient' });
  }
}

// Create a new patient
async function createPatient(req, res) {
  const { firstName, lastName, age, gender, treatmentStartDate, startingWeight } = req.body;

  if (!firstName || !lastName || !gender || !treatmentStartDate) {
    return res.status(400).json({ error: 'Missing required patient fields' });
  }

  try {
    await patientService.createPatient({
      firstName,
      lastName,
      age,
      gender,
      treatmentStartDate,
      startingWeight
    });
    res.status(201).json({ message: 'Patient created' });
  } catch (err) {
    console.error('❌ Failed to create patient:', err);
    res.status(500).json({ error: 'Could not create patient', details: err.message });
  }
}

// Add a new weekly report to a patient
async function addReport(req, res) {
  const { id } = req.params;
  const report = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Patient ID is required' });
  }

  if (!report || Object.keys(report).length === 0) {
    return res.status(400).json({ error: 'Report data is required' });
  }

  try {
    const success = await patientService.addReport(id, report);
    if (!success) {
      return res.status(500).json({ error: 'Failed to add report' });
    }
    res.status(201).json({ message: 'Report added successfully' });
  } catch (err) {
    console.error(`❌ Failed to add report for patient ${id}:`, err);
    res.status(500).json({ error: 'Could not add report', details: err.message });
  }
}

// Delete a patient by ID
async function deletePatient(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Patient ID is required' });
  }

  try {
    const success = await patientService.deletePatient(id);
    if (!success) {
      return res.status(404).json({ error: 'Patient not found or already deleted' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    console.error(`❌ Failed to delete patient ${id}:`, err);
    res.status(500).json({ error: 'Could not delete patient', details: err.message });
  }
}

module.exports = {
  getPatients,
  createPatient,
  getPatientById,
  addReport,
  deletePatient
};




