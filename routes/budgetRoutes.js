const express = require("express");
const { addBudget, getBudgets, updateBudget, deleteBudget, getBudgetAlerts } = require("../controllers/budgetController");
const authenticateToken = require("../controllers/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, addBudget); // Add a budget
router.get("/", authenticateToken, getBudgets); // Get all budgets for user
router.put("/:id", authenticateToken, updateBudget); // Update a budget
router.delete("/:id", authenticateToken, deleteBudget); // Delete a budget
router.get("/alerts", authenticateToken, getBudgetAlerts); // Get all alerts for user

module.exports = router;
