const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  alerts: [
    {
      threshold: Number, 
      message: String,
    }
  ]
});

module.exports = mongoose.model("Budget", budgetSchema);

