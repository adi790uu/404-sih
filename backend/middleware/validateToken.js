const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(' ')[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;
    req.user = userId;
    next();
  });
};

module.exports = validateToken;
