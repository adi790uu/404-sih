const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

router.use(validateToken);

router.route('/').get((req, res) => {
  res.json({ msg: 'Validated...' });
});

module.exports = router;
