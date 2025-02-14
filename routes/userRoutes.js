const express = require('express');
const router = express.Router();

// Make sure the path is correct based on where userController.js is located
const userController = require('../controllers/userController');  // Adjust the path if needed

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

// Export the router
module.exports = router;
