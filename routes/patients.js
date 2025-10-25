const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');

// Get all patients
router.get('/', auth, patientController.getPatients);

// Get a single patient by ID
router.get('/:id', auth, patientController.getPatientById);

// Create a new patient
router.post('/', auth, patientController.createPatient);

// Add a new weekly report to a patient
router.post('/:id/reports', auth, patientController.addReport);

// Delete a patient by ID
router.delete('/:id', auth, patientController.deletePatient);

module.exports = router;




