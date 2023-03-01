const Joi = require("joi")

const userSigupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  role: Joi.string()
    .valid("admin", "seller", "supporter", "customer")
    .required(),
})

module.exports = userSigupSchema
