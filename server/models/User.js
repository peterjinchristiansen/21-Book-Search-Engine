const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const bookSchema = require('./Book')

const userSchema = new Schema({
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
    savedBooks: [bookSchema]
}, {
    toJSON: { virtuals: true }
})

userSchema.pre('save', async (next) => {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})

userSchema.methods.isCorrectPassword = async (password) => {
    return bcrypt.compare(password, this.password)
}

userSchema.virtual('bookCount').get(() => {
    return this.savedBooks.length
})

const User = model('User', userSchema)
module.exports = User