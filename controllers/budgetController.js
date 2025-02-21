const Budget = require("../models/budgetModel");
const Record = require("../models/recordModel");

// Add a new budget
const addBudget = async (req, res) => {
    try {
      const { category, limit, alerts } = req.body;
  
      const defaultAlerts = [
        { threshold: 80, message: `You have used 80% of your ${category} budget!` },
        { threshold: 100, message: `You have exceeded your ${category} budget!` }
      ];
  
      const budget = new Budget({
        userId: req.user.userId,
        category,
        limit,
        alerts: alerts && alerts.length > 0 ? alerts : defaultAlerts, 
      });
  
      await budget.save();
      res.status(201).json(budget);
    } catch (error) {
      console.error("Error creating budget:", error);
      res.status(500).json({ message: "Server error", error });
    }
};
  

// Get all budgets for the user
const getBudgets = async (req, res) => {
    try {
      console.log("Fetching budgets for user:", req.user.userId);
      const budgets = await Budget.find({ userId: req.user.userId });
      console.log("Budgets found:", budgets);
      
      res.status(200).json(budgets);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      res.status(500).json({ message: "Server error", error });
    }
};  

// Update a budget
const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { category, limit } = req.body;

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { category, limit },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget updated successfully", budget: updatedBudget });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get budget alerts
const getBudgetAlerts = async (req, res) => {
    try {
      const budgets = await Budget.find({ userId: req.user.userId });
  
      let alerts = [];
  
      for (let budget of budgets) {
        const totalSpent = await Record.aggregate([
          { $match: { userId: budget.userId, category: budget.category } },
          { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);
  
        const spent = totalSpent.length > 0 ? totalSpent[0].totalAmount : 0;
        const percentageUsed = (spent / budget.limit) * 100;
  
        let triggeredAlerts = [];
  
        budget.alerts.forEach(alert => {
          if (percentageUsed >= alert.threshold) {
            triggeredAlerts.push({
              threshold: alert.threshold,
              message: alert.message,
            });
          }
        });
  
        alerts.push({
          category: budget.category,
          limit: budget.limit,
          spent: spent,
          percentageUsed: percentageUsed.toFixed(2) + "%",
          alerts: triggeredAlerts,
        });
      }
  
      res.status(200).json(alerts);
    } catch (error) {
      console.error("Error fetching budget alerts:", error);
      res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addBudget, getBudgets, updateBudget, deleteBudget, getBudgetAlerts };
