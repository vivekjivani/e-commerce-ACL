const ErrorResponse = require("../utils/ErrorResponse")
const { User } = require("../models")
const jwt = require("jsonwebtoken")

module.exports.protect = async function (req, res, next) {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }

  console.log(token)

  if (!token) {
    return next(new ErrorResponse("Not authorized to access endpoint", 401))
  }

  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log("🚀 ~ file: auth.js:22 ~ decodedToken:", decodedToken)

    let user = await User.findOne({ where: { id: decodedToken.id } })

    if (!user) {
      return next(new ErrorResponse("Not authorized to access endpoint", 401))
    }

    req.user = user

    next()
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access endpoint", 401))
  }
}

module.exports.authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse("Not authorized to access endpoint", 401))
    }
    next()
  }
