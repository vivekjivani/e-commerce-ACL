const express = require("express")
const { login } = require("../controllers/login")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/ErrorResponse")

const router = express.Router()

router.route("/").post(login)

module.exports = router
