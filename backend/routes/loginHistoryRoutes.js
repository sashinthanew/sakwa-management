const express = require('express');
const router = express.Router();
const LoginHistory = require('../models/LoginHistory');
const auth = require('../middleware/auth');

// Get all login history (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const history = await LoginHistory.find()
      .sort({ loginTime: -1 })
      .limit(100);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 