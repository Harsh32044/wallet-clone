const express = require("express");
const port = process.env.PORT || 3000
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const rootRouter = require('./routes/index')

app.use("/api/v1", rootRouter)

app.listen(port, () => console.log("Listening on " + port))