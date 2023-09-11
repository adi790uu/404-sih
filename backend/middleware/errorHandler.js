const errorHandler = (error, req, res, next) => {
  error.message = error.message || 'Internal server error';
  error.statusCode = error.statusCode || 500;

  if (error.name === 'MongoServerError') {
    switch (error.code) {
      case 11000: {
        error.message = 'Duplicate key Error';
        error.statusCode = 409;
      }
      default: {
        error.message = 'MongoDB server error';
        error.statusCode = 500;
      }
    }
  }

  res.status(error.statusCode).json({ success: false, message: error.message });
};

module.exports = errorHandler;
