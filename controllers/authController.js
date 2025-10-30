const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    await userService.createUser(email, password);
    res.status(201).json({ message: 'User registered successfully', email });
  } catch (err) {
    if (err.code === 11000 || err.message.includes('duplicate key')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('❌ Registration failed:', err);
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error('❌ Login failed:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const email = req.user?.email;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await userService.changePassword(email, currentPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('❌ Change password failed:', err.message);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  changePassword
};




