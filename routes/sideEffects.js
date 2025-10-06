const express = require('express');
const router = express.Router();
const sideEffectController = require('../controllers/sideEffectController');
const auth = require('../middleware/auth');

router.get('/', auth, sideEffectController.getSideEffects);
router.post('/', auth, sideEffectController.createSideEffect);

module.exports = router;
