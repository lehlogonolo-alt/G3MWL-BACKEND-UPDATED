const Patient = require('../models/Patient');

async function getAllPatients() {
  try {
    return await Patient.find({});
  } catch (err) {
    console.error('❌ Failed to fetch patients:', err);
    throw new Error('Could not retrieve patients');
  }
}

async function createPatient(data) {
  try {
    const patient = new Patient({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      treatmentStartDate: data.treatmentStartDate,
      startingWeight: data.startingWeight
    });
    await patient.save();
  } catch (err) {
    console.error('❌ Failed to create patient:', err);
    throw new Error('Could not create patient');
  }
}

module.exports = { getAllPatients, createPatient };

