const mongoose = require('mongoose')
const BookSchema = require('./Book')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    savedBooks: [BookSchema]
}, {
    toJSON: { virtuals: true }
})

module.exports = mongoose.model('User', UserSchema)