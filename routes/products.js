const express = require("express")
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/ErrorResponse")
const { authorize, protect } = require("../middleware/auth")
const router = express.Router()

router
  .route("/")
  .get(
    protect,
    authorize("admin", "seller", "supporter", "customer"),
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Products sent successfully" })
    })
  )
  .post(
    protect,
    authorize("admin", "seller"),
    asyncHandler((req, res, next) => {
      res.status(201).json({ message: "Products Added successfully" })
    })
  )
  .put(
    protect,
    authorize("admin", "seller"),
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Product Updated successfully" })
    })
  )
  .patch(
    protect,
    authorize("admin", "seller"),
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Product Updated successfully" })
    })
  )
  .delete(
    protect,
    authorize("admin", "supporter"),
    asyncHandler((req, res, next) => {
      res.status(200).json({ message: "Product deleted successfully" })
    })
  )

module.exports = router
