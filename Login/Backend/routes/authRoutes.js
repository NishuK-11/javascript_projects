const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

router.post('/login', loginUser);
// Optional route if you plan to register users
router.post('/register', registerUser);

module.exports = router;
