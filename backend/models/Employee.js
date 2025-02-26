const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
    default: 0
  },
  attendance: {
    type: Number,
    default: 0
  },
  projectsCompleted: {
    type: Number,
    default: 0
  },
  taskCompletion: {
    type: Number,
    default: 0
  },
  qualityOfWork: {
    type: Number,
    default: 0
  },
  teamCollaboration: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active'
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  reviews: [{
    date: Date,
    rating: Number,
    comment: String,
    reviewer: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema); 