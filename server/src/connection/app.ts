import { ErrorMiddleware } from "../interface/middleware.interface"
import cookieParser from "cookie-parser"
import { MESSAGE_API } from "./config"
import express from "express"
import morgan from "morgan"
import pingRouter from "../routes/index.routes"

const app = express()

// Middleware
app.use(morgan("dev"))
/*app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
))*/
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routers
app.get("/", (_, res) => {
  res.json(MESSAGE_API)
})

app.use("/api/v1", pingRouter)

// Error handler
const errorHandler: ErrorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message
  });
};

app.use(errorHandler)

export default app
