const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL) //DB Name = paytm

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true, // Create an index for efficient querying
     },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

const BankAccountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('user', UserSchema) //Document Name = user
const Account = mongoose.model('account', BankAccountSchema) //Document Name = accounts

module.exports = {
    User,
    Account
}