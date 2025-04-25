// models/PerformanceData.js
const mongoose = require('mongoose');

const performanceDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  performance: {
    type: Number,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  department: String,
  timeframe: {
    type: String,
    enum: ['week', 'month', 'quarter', 'year'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('PerformanceData', performanceDataSchema);