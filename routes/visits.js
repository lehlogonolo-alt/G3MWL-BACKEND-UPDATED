const express = require('express');
const router = express.Router();
const visitService = require('../services/visitService');
const auth = require('../middleware/auth');

router.get('/:siteName', auth, async (req, res) => {
  try {
    const data = await visitService.getMonthlyVisits(req.params.siteName);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch site visits', details: err.message });
  }
});

module.exports = router;
