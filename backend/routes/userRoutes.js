const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const {
  registerUser,
  authUser,
  registerEmployee,
  authEmployee,
} = require('../controllers/users');

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/employee/register').post(registerEmployee);
router.route('/employee/authEmployee').post(authEmployee);

module.exports = router;
