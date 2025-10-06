const sideEffectService = require('../services/sideEffectService');

async function getSideEffects(req, res) {
  try {
    const effects = await sideEffectService.getAllSideEffects();
    res.json(effects);
  } catch (err) {
    console.error('❌ Failed to fetch side effects:', err);
    res.status(500).json({ error: 'Could not retrieve side effects' });
  }
}

async function createSideEffect(req, res) {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Side effect name is required and must be a string' });
  }

  try {
    await sideEffectService.createSideEffect(name);
    res.status(201).json({ message: 'Side effect added' });
  } catch (err) {
    console.error('❌ Failed to create side effect:', err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getSideEffects, createSideEffect };

