const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000,
};

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (
      username.trim() !== process.env.ADMIN_USERNAME ||
      password.trim() !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: username.trim(), role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('adminToken', token, COOKIE_OPTS);
    res.json({ message: 'Login successful', username: username.trim(), token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Logged out' });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ username: req.admin.username, role: req.admin.role || 'admin' });
});

module.exports = router;
