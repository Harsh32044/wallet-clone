const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;
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

// !Storing hashed password
// UserSchema.pre("save", async next => {
//     const user = this

//     if (!user.isModified('password')) return next() //isModified('<fieldname>') checks whether current field is modified

//     try {
//         const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
//         const hashedPwd = await bcrypt.hash(user.password, salt)
//         user.password = hashedPwd
//         return next()
//     }
//     catch (e) {
//         return next(e)
//     }
    
// })

// ! To validate password
// UserSchema.methods.validatePassword = (password) => {
//     return bcrypt.compare(password, this.password)
// }

const User = mongoose.model('user', UserSchema) //Document Name = user
const Account = mongoose.model('account', BankAccountSchema) //Document Name = accounts

module.exports = {
    User,
    Account
}