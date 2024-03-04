const express = require('express')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const { default: mongoose } = require('mongoose')

const accountRoute = express.Router()

//I want to get my balance

accountRoute.get("/balance", authMiddleware, async (req,res) => {
    const userId = req.userId
    const user = await Account.findOne({
        userId
    })
    res.json({
        balance: user.balance
    })
})

// !Transfer money to another account, much much better approach

accountRoute.post("/transfer", authMiddleware, async (req,res) => {
    const fromAcntUserId = req.userId
    const toAcntUserId = req.body.to
    const txnAmount = parseFloat(req.body.amount)

    if (txnAmount <= 0) {
        return res.status(400).json({
            error: "Invalid Transaction Amount"
        })
    }
    const session = await mongoose.startSession();

    let fromAcnt, toAcnt;
    try {
        await session.withTransaction(async() => {
            fromAcnt = await Account.findOneAndUpdate(
                { userId: fromAcntUserId, balance: { $gte: txnAmount }},
                { $inc: { balance: - txnAmount } },
                {new : true, session}
            )
            
            if (!fromAcnt) {
                throw new Error("Insufficient funds or sender not found.")
            }
            toAcnt = await Account.findOneAndUpdate(
                { userId: toAcntUserId },
                { $inc: { balance: txnAmount } },
                {new : true, session}
            )
    
            if (!toAcnt) {
                throw new Error("Recepient account not found")
            }
        })
        
        res.status(200).json({
            message: "Transfer Successful",
            fromAccountBalance: fromAcnt.balance,
            toAccountBalance: toAcnt.balance
        })
    }
    catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
    finally {
        session.endSession()
    }

})
module.exports = accountRoute