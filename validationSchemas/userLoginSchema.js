const Joi = require("joi")

const userLoginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = userLoginSchema
