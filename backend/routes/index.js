const express = require('express')
const userRoute = require('./user')
const accountRoute = require('./account')

const mainRouter = express.Router();

mainRouter.use("/users", userRoute)
mainRouter.use("/accounts", accountRoute)
module.exports = mainRouter