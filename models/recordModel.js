const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  metadata: { type: Object },
}, { _id: false });

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  transactions: [transactionSchema], // Embedded transactions
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;