const Patient = require('../models/Patient');

// ✅ Fetch all patients
async function getAllPatients() {
  try {
    return await Patient.find({});
  } catch (err) {
    console.error('❌ Failed to fetch patients:', err);
    throw new Error('Could not retrieve patients');
  }
}

// ✅ Fetch a single patient by ID
async function getPatientById(id) {
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient;
  } catch (err) {
    console.error(`❌ Failed to fetch patient with ID ${id}:`, err);
    throw new Error('Could not retrieve patient');
  }
}

// ✅ Create a new patient
async function createPatient(data) {
  try {
    const patient = new Patient({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      treatmentStartDate: data.treatmentStartDate,
      startingWeight: data.startingWeight,
      WeeklyReports: [] // Initialize empty weekly reports array
    });
    await patient.save();
  } catch (err) {
    console.error('❌ Failed to create patient:', err);
    throw new Error('Could not create patient');
  }
}

// ✅ Add a weekly report to a patient
async function addReport(patientId, report) {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Initialize WeeklyReports if undefined
    if (!patient.WeeklyReports) {
      patient.WeeklyReports = [];
    }

    patient.WeeklyReports.push(report);
    await patient.save();
    return true;
  } catch (err) {
    console.error(`❌ Failed to add report for patient ${patientId}:`, err);
    return false;
  }
}

module.exports = { getAllPatients, getPatientById, createPatient, addReport };

