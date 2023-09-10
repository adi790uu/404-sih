const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const { registerAgency, authAgency } = require('../controllers/agencies');

router.route('/register').post(registerAgency);
router.route('/login').post(authAgency);

module.exports = router;
