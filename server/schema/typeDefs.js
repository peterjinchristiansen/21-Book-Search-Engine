const { buildSchema } = require('graphql')

const typeDefs = buildSchema(`
    type User {
        _id: ID!
        email: String!
        username: String!
        password: String
    }

    type Authenticate {
        _id: ID!
        token: ID!
    }

    input RegisterInput {
        email: String!
        username: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input SaveInput {
        bookId: String!
        title: String!
        authors: [String]
        image: String
        description: String!
        link: String
    }

    input DeleteInput {
        bookId: String!
    }

    type RootQuery {
        getThisUser: [String!]!
        loginUser(loginInput: LoginInput): Authenticate
    }

    type RootMutation {
        createUser(registerInput: RegisterInput): User
        saveBook(saveInput: SaveInput!): User
        deleteBook(deleteInput: DeleteInput!): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

module.exports = typeDefs