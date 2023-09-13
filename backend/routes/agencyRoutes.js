const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const {
  registerAgency,
  authAgency,
  getAgencies,
} = require('../controllers/agencies');

router.route('/register').post(registerAgency);
router.route('/login').post(authAgency);
router.route('/getAgencies').get(validateToken, getAgencies);

module.exports = router;
