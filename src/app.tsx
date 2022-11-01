import express, { Express, Request, Response } from "express"
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const NODE_ENV = process.env.NODE_ENV
const app: Express = express()

const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common"

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, ts!")
})

  app.use(function errorHandler(error: Error, req: Request, res: Response) {
      const response = { message: error.message, error }
      res.status(500).json(response)
    })

module.exports = app