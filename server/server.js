const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')
const http = require("http")

const typeDefs = require('./schemas/typeDefs')
const resolvers = require('./schemas/resolvers')
const {authMiddleware} = require('./utils/auth')

const PORT = process.env.PORT || 4000
const app = express()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(() => console.log('Connected to DB'))
    let apolloServer = null;
    async function startServer() {
        apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            graphiql: true,
            context: authMiddleware
        })
        await apolloServer.start()
        apolloServer.applyMiddleware({ app })
    }
    startServer();
    const httpserver = http.createServer(app)
    app.listen(4000, function () {
        console.log(`server running on port 4000`)
    })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// if (process.env.NODE_ENV === 'production') {
//     console.log(process.env.NODE_ENV)
//   app.use(express.static(path.join(__dirname, '../client/build')))
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })