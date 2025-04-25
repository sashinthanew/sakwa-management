// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const PerformanceData = require('../models/PerformanceData');

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get performance data based on timeframe
router.get('/employees/performance/data', async (req, res) => {
  try {
    const { timeframe } = req.query;
    
    if (!timeframe || !['week', 'month', 'quarter', 'year'].includes(timeframe)) {
      return res.status(400).json({ message: "Valid timeframe parameter required (week, month, quarter, year)" });
    }
    
    const performanceData = await PerformanceData.find({ timeframe });
    res.json(performanceData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Additional routes for creating, updating, and deleting employees...

module.exports = router;