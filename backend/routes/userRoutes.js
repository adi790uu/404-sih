const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const {
  registerUser,
  authUser,
  registerEmployee,
  authEmployee,
  getWork
} = require('../controllers/users');

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/employee/register').post(registerEmployee);
router.route('/employee/authEmployee').post(authEmployee);
router.route('/employee/work').get(getWork)

module.exports = router;
