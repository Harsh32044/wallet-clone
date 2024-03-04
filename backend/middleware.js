const jwt = require('jsonwebtoken')

const userRoute = require('./routes/user')
const { JWT_SECRET } = require('./config')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.toString().startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (token == null) {
        return res.status(400).json({
            message: "Invalid or Missing Token."
        })
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    }
    catch (error) {
        next(error)
        return res.status(400).json({
            message: "Invalid or Missing Token."
        })
    }
}

module.exports = {
    authMiddleware
}