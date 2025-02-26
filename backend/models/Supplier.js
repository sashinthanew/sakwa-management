const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  supplierQuantity: {
    type: Number,
    required: true
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  department: {
    type: String,
    default: ""
  },
  workTime: {
    type: String,
    default: ""
  },
  workDates: {
    type: String,
    default: ""
  },
  arrivalTime: {
    type: String,
    default: ""
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Supplier", supplierSchema);
