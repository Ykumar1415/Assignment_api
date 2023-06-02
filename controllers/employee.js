const Employee = require("../models/employee");
const pagination = require("../utils/pagination");
exports.createEmployee = async (req, res) => {
  const {
    fullName,
    jobTitle,
    phoneNumber,
    email,
    address,
    city,
    state,
    primaryEmergencyContact,
    secondaryEmergencyContact,
  } = req.body;

  const employee = new Employee({
    fullName,
    jobTitle,
    phoneNumber,
    email,
    address,
    city,
    state,
    primaryEmergencyContact,
    secondaryEmergencyContact,
  });

  try {
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

exports.listEmployees = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const results = await Employee.find()
      .skip(pagination.getSkip(page, limit))
      .limit(limit)
      .exec();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};

exports.getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id).exec();

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employee" });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, contacts } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, contacts },
      { new: true }
    ).exec();

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id).exec();

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
