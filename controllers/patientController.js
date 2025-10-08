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
    console.error('❌ Failed to fetch patient by ID:', err);
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

module.exports = { getPatients, createPatient, getPatientById };


