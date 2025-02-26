const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/', async (req, res) => {
  try {
    console.log('Fetching employees...');
    const employees = await Employee.find();
    console.log('Found employees:', employees);
    
    if (employees.length === 0) {
      console.log('No employees found, generating samples...');
      const sampleEmployees = generateSampleEmployees();
      await Employee.insertMany(sampleEmployees);
      console.log('Sample employees created:', sampleEmployees);
      res.json(sampleEmployees);
    } else {
      res.json(employees);
    }
  } catch (error) {
    console.error('Error in employee route:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single employee
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    Object.keys(req.body).forEach(key => {
      employee[key] = req.body[key];
    });

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add performance review
router.post('/:id/reviews', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.reviews.push({
      date: new Date(),
      rating: req.body.rating,
      comment: req.body.comment,
      reviewer: req.body.reviewer
    });

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get performance data
router.get('/performance/data', async (req, res) => {
  const { timeframe } = req.query;
  const data = generatePerformanceData(timeframe);
  res.json(data);
});

// Helper function to generate sample employees
function generateSampleEmployees() {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Operations'];
  const positions = ['Manager', 'Senior', 'Junior', 'Lead', 'Associate'];
  const sampleEmployees = [];

  for (let i = 1; i <= 10; i++) {
    sampleEmployees.push({
      name: `Employee ${i}`,
      email: `employee${i}@example.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      performanceScore: Math.floor(Math.random() * 30) + 70,
      attendance: Math.floor(Math.random() * 20) + 80,
      projectsCompleted: Math.floor(Math.random() * 10) + 1,
      taskCompletion: Math.floor(Math.random() * 30) + 70,
      qualityOfWork: Math.floor(Math.random() * 30) + 70,
      teamCollaboration: Math.floor(Math.random() * 30) + 70,
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      joiningDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365)
    });
  }

  return sampleEmployees;
}

// Helper function to generate performance data
function generatePerformanceData(timeframe) {
  const data = [];
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Operations'];
  
  if (timeframe === 'week') {
    for (let i = 0; i < 7; i++) {
      data.push({
        date: `Day ${i + 1}`,
        performance: Math.floor(Math.random() * 30) + 70,
        target: 85
      });
    }
  } else if (timeframe === 'month') {
    for (let i = 0; i < 30; i++) {
      data.push({
        date: `Day ${i + 1}`,
        performance: Math.floor(Math.random() * 30) + 70,
        target: 85
      });
    }
  }

  departments.forEach(dept => {
    data.push({
      department: dept,
      performance: Math.floor(Math.random() * 30) + 70,
      teamSize: Math.floor(Math.random() * 20) + 5
    });
  });

  return data;
}

module.exports = router; 