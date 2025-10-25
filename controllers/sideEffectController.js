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
  const { name, severity } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Side effect name is required and must be a string' });
  }

  if (!['mild', 'moderate', 'severe'].includes(severity)) {
    return res.status(400).json({ error: 'Severity must be mild, moderate, or severe' });
  }

  try {
    await sideEffectService.createSideEffect(name, severity);
    res.status(201).json({ message: 'Side effect added' });
  } catch (err) {
    console.error('❌ Failed to create side effect:', err);
    res.status(400).json({ error: err.message });
  }
}

async function deleteSideEffect(req, res) {
  const { id } = req.params;

  try {
    const success = await sideEffectService.deleteSideEffect(id);
    if (!success) {
      return res.status(404).json({ error: 'Side effect not found' });
    }

    res.status(200).json({ message: 'Side effect deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete side effect:', err);
    res.status(500).json({ error: err.message || 'Could not delete side effect' });
  }
}

module.exports = {
  getSideEffects,
  createSideEffect,
  deleteSideEffect
};




