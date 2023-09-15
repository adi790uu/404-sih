const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const {
  registerAgency,
  authAgency,
  getAgencies,
  getRequests,
} = require('../controllers/agencies');

router.route('/register').post(registerAgency);
router.route('/login').post(authAgency);

router.route('/getAgencies').post(validateToken, getAgencies);
router.route('/getRequests').post(validateToken, getRequests);

module.exports = router;
