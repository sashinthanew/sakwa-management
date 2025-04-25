// seeds/seed.js
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const PerformanceData = require('../models/PerformanceData');

mongoose.connect('mongodb://localhost:27017/employee_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB for seeding');
  
  // Clear existing data
  await Employee.deleteMany({});
  await PerformanceData.deleteMany({});
  
  // Seed employees
  const employees = [
    {
      name: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      performanceScore: 92,
      attendance: 95,
      taskCompletion: 90,
      qualityOfWork: 88,
      teamCollaboration: 85,
      projectsCompleted: 8,
      status: 'Active'
    },
    // Add more sample employees...
  ];
  
  await Employee.insertMany(employees);
  
  // Seed performance data
  const weekData = [
    { date: 'Mon', performance: 82, target: 80, timeframe: 'week' },
    { date: 'Tue', performance: 85, target: 80, timeframe: 'week' },
    { date: 'Wed', performance: 83, target: 80, timeframe: 'week' },
    { date: 'Thu', performance: 88, target: 80, timeframe: 'week' },
    { date: 'Fri', performance: 90, target: 80, timeframe: 'week' }
  ];
  
  const monthData = [
    { date: 'Week 1', performance: 82, target: 80, timeframe: 'month' },
    { date: 'Week 2', performance: 84, target: 80, timeframe: 'month' },
    { date: 'Week 3', performance: 87, target: 80, timeframe: 'month' },
    { date: 'Week 4', performance: 91, target: 80, timeframe: 'month' }
  ];
  
  // Create data for departments
  const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];
  const departmentData = departments.map(dept => ({
    department: dept,
    performance: Math.floor(Math.random() * 20) + 70,  // Random between 70-90
    teamSize: Math.floor(Math.random() * 10) + 5,      // Random between 5-15
    timeframe: 'month'
  }));
  
  await PerformanceData.insertMany([...weekData, ...monthData, ...departmentData]);
  
  console.log('Database seeded successfully');
  process.exit(0);
})
.catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});