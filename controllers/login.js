const asyncHandler = require("../middleware/async")
const { User } = require("../models")
const ErrorResponse = require("../utils/ErrorResponse")

const userLoginSchema = require("../validationSchemas/userLoginSchema")

module.exports.login = asyncHandler(async function (req, res, next) {
  console.log(req.body)

  const result = userLoginSchema.validate(req.body, {
    abortEarly: false,
  })

  if (result.error) {
    const errorMessage = result.error.details
      .map((err) => err.message)
      .join(", ")
    return next(new ErrorResponse(errorMessage, 400))
  }

  const user = await User.findOne({ where: { userName: req.body.userName } })

  console.log(user)

  if (!user) {
    return next(new ErrorResponse("User not found", 404))
  }

  const isMatch = await user.matchPassword(req.body.password)

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401))
  }

  let token = user.generateToken()

  console.log(token)

  res.status(200).json({
    success: true,
    token,
  })
})
