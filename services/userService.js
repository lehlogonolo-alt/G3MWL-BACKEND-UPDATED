const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(email, password) {
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashed });
    await user.save();
    return { email };
  } catch (err) {
    if (err.code === 11000 || err.message.includes('duplicate key')) {
      throw new Error('Email already exists');
    }
    throw err;
  }
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function changePassword(email, currentPassword, newPassword) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Incorrect current password');

  const hashedNew = await bcrypt.hash(newPassword, 10);
  user.password = hashedNew;
  await user.save();
  return { message: 'Password updated successfully' };
}

module.exports = {
  createUser,
  findUserByEmail,
  changePassword
};






