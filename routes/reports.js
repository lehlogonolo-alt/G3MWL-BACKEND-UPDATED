const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Create a new weekly report
router.post('/', reportController.createReport);

// Get all reports for a patient
router.get('/patient/:id', reportController.getReportsByPatient);

// Update a report by ID
router.put('/:id', reportController.updateReport);

// Delete a report by ID
router.delete('/:id', reportController.deleteReport);

module.exports = router;
