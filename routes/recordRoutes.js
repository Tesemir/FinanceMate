const express = require("express");
const { addRecord, getUserRecords, updateRecord, deleteRecord } = require("../controllers/recordController");
const authenticateToken = require("../controllers/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, addRecord);
router.get("/", authenticateToken, getUserRecords);
router.put("/:id", authenticateToken, updateRecord);
router.delete("/:id", authenticateToken, deleteRecord);

module.exports = router;
