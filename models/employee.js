const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: String,
  jobTitle: String,
  phoneNumber: String,
  email: String,
  address: String,
  city: String,
  state: String,
  primaryEmergencyContact: {
    name: String,
    phoneNumber: String,
    relationship: String,
  },
  secondaryEmergencyContact: {
    name: String,
    phoneNumber: String,
    relationship: String,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
