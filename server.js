require("colors")
const express = require("express")
const dotenv = require("dotenv")
const requestLogger = require("morgan")
const errorHandler = require("./middleware/error")
const { sequelize } = require("./models")

// load Env Vars
dotenv.config({ path: "./config/config.env" })

// Load Routers
const productRouter = require("./routes/products")
const signUp = require("./routes/signup")

const app = express()

// Request Logger For Dev Env
if (process.env.NODE_ENV !== "production") {
  app.use(requestLogger("dev"))
}

// body Parser
app.use(express.json())

// Load Routes
app.use("/products", productRouter)
app.use("/signup", signUp)

// Error Handler Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green)
  sequelize.sync().then(() => {
    console.log("Database Connected".green.inverse)
  })
})

process.on("uncaughtException", (error) => {
  console.log(`Unhandled Exception: ${error.message}`.red)
  console.log(error)
  server.close(() => {
    process.exit(1)
  })
})
