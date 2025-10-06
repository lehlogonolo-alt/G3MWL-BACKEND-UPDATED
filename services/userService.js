const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(email, password) {
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashed });
    await user.save();
    return { email };
  } catch (err) {
    // MongoDB duplicate key error code is 11000
    if (err.code === 11000 || err.message.includes('duplicate key')) {
      throw new Error('Email already exists');
    }
    throw err; // re-throw other errors
  }
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

module.exports = { createUser, findUserByEmail };




