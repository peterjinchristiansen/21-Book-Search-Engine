import gql from 'graphql-tag'

export const ADD_USER = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            user {
                _id
                username
            }
        }
    }
`

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation add(
        $authors: [String],
        $description: String,
        $bookId: ID,
        $image: String,
        $link: String,
        $title: String
    ) {
    saveBook(
        authors: $authors,
        description: $description,
        bookId: $bookId,
        image: $image,
        link: $link,
        title: $title
    ) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
        }
    }}
`

export const REMOVE_BOOK = gql`
    mutation remove(
        $bookId: ID!
    ) {
        removeBook(
        bookId: $bookId
        ) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`