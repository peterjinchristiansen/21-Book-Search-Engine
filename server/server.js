const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const { authMiddleware } = require('./utils/auth')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(authMiddleware)

app.use('/graphql', graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true
}))

mongoose.connect('mongodb://localhost/bookSearchEngine', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}...`)
    })
}).catch(error => {
    console.log(error.message)
})

