const Patient = require('../models/Patient');
const WeeklyReport = require('../models/WeeklyReport');

// ✅ Fetch all patients
async function getAllPatients() {
  try {
    return await Patient.find({});
  } catch (err) {
    console.error('❌ Failed to fetch patients:', err);
    throw new Error('Could not retrieve patients');
  }
}

// ✅ Fetch a single patient by ID along with their weekly reports
async function getPatientById(id) {
  try {
    const patient = await Patient.findById(id).lean(); // Use lean() for plain JS object
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Fetch all weekly reports for this patient
    const reports = await WeeklyReport.find({ patientId: id }).sort({ weekNumber: 1 });
    patient.WeeklyReports = reports;

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
      startingWeight: data.startingWeight
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
    const patientExists = await Patient.exists({ _id: patientId });
    if (!patientExists) {
      throw new Error('Patient not found');
    }

    const newReport = new WeeklyReport({
      ...report,
      patientId
    });

    await newReport.save();
    return true;
  } catch (err) {
    console.error(`❌ Failed to add report for patient ${patientId}:`, err);
    return false;
  }
}

module.exports = { getAllPatients, getPatientById, createPatient, addReport };
