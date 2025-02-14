const Record = require("../models/recordModel");

const addRecord = async (req, res) => {
  const { type, amount, description, category } = req.body; // Add category to body fields

  // Ensure all required fields are present
  if (!type || !amount || !category) {
    return res.status(400).json({ message: 'Type, amount, and category are required.' });
  }

  // Ensure user is authenticated and userId is set
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: 'User is not authenticated.' });
  }

  const newRecord = new Record({
    userId: req.user.userId, // Set userId from the JWT token
    type,
    amount,
    description,
    category,
  });

  try {
    await newRecord.save();
    res.status(201).json({ message: "Record added successfully", record: newRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getRecords = async (req, res) => {
  const records = await Record.find({ user: req.user.userId });
  res.status(200).json(records);
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { type, amount, description } = req.body;

  const updatedRecord = await Record.findByIdAndUpdate(id, { type, amount, description }, { new: true });
  if (!updatedRecord) return res.status(404).json({ message: "Record not found" });

  res.status(200).json({ message: "Record updated successfully", record: updatedRecord });
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;

  const deletedRecord = await Record.findByIdAndDelete(id);
  if (!deletedRecord) return res.status(404).json({ message: "Record not found" });

  res.status(200).json({ message: "Record deleted successfully" });
};

module.exports = { addRecord, getRecords, updateRecord, deleteRecord };
