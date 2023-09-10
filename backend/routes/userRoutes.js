const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const { registerUser, authUser, getUser } = require('../controllers/users');

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/user').get(validateToken, getUser);

module.exports = router;
