// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  performanceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  attendance: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  taskCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  qualityOfWork: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  teamCollaboration: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  projectsCompleted: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On-Leave', 'Probation'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);