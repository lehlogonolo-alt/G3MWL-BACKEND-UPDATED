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

module.exports = router;

