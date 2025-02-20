const transactionSchema = new mongoose.Schema({
    recordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Record', required: true, index: true },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    metadata: { type: Object },
  });
  
  const Transaction = mongoose.model('Transaction', transactionSchema);
  module.exports = Transaction;