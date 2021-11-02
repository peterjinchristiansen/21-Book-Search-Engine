const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    authors: [{ type: String }],
    description: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    image: { type: String },
    link: { type: String },
    title: {
        type: String,
        required: true
    }
})

module.exports = BookSchema