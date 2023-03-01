const express = require("express")
const { signup } = require("../controllers/signup")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/ErrorResponse")

const router = express.Router()

router.route("/").post(signup)

module.exports = router
