const SideEffect = require('../models/SideEffect');

async function getAllSideEffects() {
  try {
    return await SideEffect.find({});
  } catch (err) {
    console.error('❌ Failed to fetch side effects:', err);
    throw new Error('Could not retrieve side effects');
  }
}

async function createSideEffect(name, severity) {
  try {
    const sideEffect = new SideEffect({ name, severity });
    await sideEffect.save();
  } catch (err) {
    if (err.code === 11000 || err.message.includes('duplicate key')) {
      throw new Error('Side effect already exists');
    }
    console.error('❌ Failed to create side effect:', err);
    throw new Error('Could not create side effect');
  }
}

async function deleteSideEffect(id) {
  try {
    const deleted = await SideEffect.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error('Side effect not found');
    }
    return true;
  } catch (err) {
    console.error('❌ Failed to delete side effect:', err);
    throw new Error('Could not delete side effect');
  }
}

module.exports = {
  getAllSideEffects,
  createSideEffect,
  deleteSideEffect
};




