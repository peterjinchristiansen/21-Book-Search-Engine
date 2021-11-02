const bcrypt = require('bcrypt')
const { signToken } = require('../utils/auth')
const User = require('../models/User')

const resolvers = {
    getThisUser: async (args) => {
        try {
            const getUser = await User.find({ id: args._id })
            return(getUser)
        } catch (error) {
            console.log('ERROR => ', error.message)
        }
    },
    createUser: async (args) => {
        try {
            const hashed = await bcrypt.hash(args.registerInput.password, 10)
            const createUser = await User.create({
                email: args.registerInput.email,
                username: args.registerInput.username,
                password: hashed
            })
            return(createUser)
        } catch (error) {
            console.log('ERROR => ', error.message)
        }
    },
    loginUser: async (args) => {
        const getUser = await User.findOne({ email: args.loginInput.email })
        if(!getUser) {
            throw new Error('Incorrect Email')
        }
        const check = await bcrypt.compare(args.loginInput.password, getUser.password)
        if(!check) {
            throw new Error('Incorrect Password')
        }
        const token = signToken(getUser)
        return ({ token, getUser })
    },
    saveBook: async (args) => {
        try {
            const saveBook = await User.findOneAndUpdate(
                { id: args.saveInput._id },
                { $addToSet: { savedBooks: args.saveInput }},
                { new: true, useValidators: true }
            )
            return(saveBook)
        } catch (error) {
            console.log('ERROR => ', error.message)
        }
    },
    removeBook: async (args) => {
        try {
            const removeBook = await User.findOneAndUpdate(
                { id: args.saveInput._id },
                { $addToSet: { savedBooks: args.removeInput.bookId }},
                { new: true }
            )
            return(removeBook)
        } catch (error) {
            console.log('ERROR => ', error.message)
        }
    }
}

module.exports = resolvers


