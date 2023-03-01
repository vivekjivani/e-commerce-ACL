const Joi = require("joi")
const asyncHandler = require("../middleware/async")
const { User } = require("../models")
const ErrorResponse = require("../utils/ErrorResponse")

const userSigupSchema = require("../validationSchemas/userSignUpSchema")

module.exports.signup = asyncHandler(async function (req, res, next) {
  console.log(req.body)

  const result = userSigupSchema.validate(req.body, {
    abortEarly: false,
  })

  if (result.error) {
    const errorMessage = result.error.details
      .map((err) => err.message)
      .join(", ")
    return next(new ErrorResponse(errorMessage, 400))
  }

  res.status(200).json({
    success: true,
  })
})
