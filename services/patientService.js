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
startingWeight: data.startingWeight
});
await patient.save();
} catch (err) {
console.error('❌ Failed to create patient:', err);
throw new Error('Could not create patient');
}
}

module.exports = { getAllPatients, getPatientById, createPatient };


