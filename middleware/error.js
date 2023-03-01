const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Log Error
  console.log(error)

  // Handle Validation Errors

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || "Server Error",
    },
  })
}

module.exports = errorHandler
