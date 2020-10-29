const express = require("express")
const imageRouter = require("./routers/image")
const userRouter = require("./routers/user")
const authRouter = require("./routers/auth")
const authMiddleware = require("./auth/middleware")

const app = express()
const jsonParser = express.json()

app.use(jsonParser)

app.use("/images", authMiddleware, imageRouter)
app.use("/users", userRouter)
app.use("/login", authRouter)

const PORT = process.env.PORT | 4000
app.listen(PORT, console.log(`Listening on: ${PORT}`))