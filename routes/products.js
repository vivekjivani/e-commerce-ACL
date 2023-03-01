const express = require("express")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/ErrorResponse")

const router = express.Router()

router
  .route("/")
  .get(
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Products sent successfully" })
    })
  )
  .post(
    asyncHandler((req, res, next) => {
      res.status(201).json({ message: "Products Added successfully" })
    })
  )
  .put(
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Product Updated successfully" })
    })
  )
  .patch(
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Product Updated successfully" })
    })
  )
  .delete(
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Product deleted successfully" })
    })
  )

module.exports = router
