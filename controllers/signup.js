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

  const userInDB = await User.findOne({
    where: { userName: req.body.userName },
  })

  if (userInDB) {
    return next(new ErrorResponse("User already exists", 400))
  }

  const user = await User.create(req.body)

  let token = user.generateToken()

  res.status(200).json({
    success: true,
    token,
  })
})
