const patientService = require('../services/patientService');

async function getPatients(req, res) {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (err) {
    console.error('❌ Failed to fetch patients:', err);
    res.status(500).json({ error: 'Could not retrieve patients' });
  }
}

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

module.exports = { getPatients, createPatient };

