import { Jumbotron, Container, CardColumns, Card, Button} from 'react-bootstrap'
import { GET_ME } from '../utils/Queries'
import { REMOVE_BOOK } from '../utils/Mutations'
import Auth from '../utils/Auth'
import { removeBookId } from '../utils/localStorage'
import { useQuery, useMutation } from '@apollo/react-hooks'


const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME)
    const [removeBook] = useMutation(REMOVE_BOOK)
    const userData = data?.me || {}

    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null
        if (!token) {
            return false
        }
        try {
            const { data } = await removeBook({
                variables: { bookId }
            })
            removeBookId(data);
        } catch (error) {
            console.log('ERROR => ', error);
        }
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
        <Jumbotron fluid className="text-light bg-dark">
            <Container>
                <h1>Viewing saved books!</h1>
            </Container>
        </Jumbotron>
        <Container>
            <h2>
                {
                    userData.bookCount ?
                    `Viewing ${userData.bookCount} saved ${userData.bookCount === 1 ? 'book' : 'books'}:` :
                    'You have no saved books!'
                }
            </h2>
            <CardColumns>
                {userData.savedBooks.map((book) => {
                    return (
                        <Card key={book.bookId} border="dark">
                            {
                                book.image ?
                                (
                                    <Card.Img
                                        src={book.image}
                                        alt={`The cover for ${book.title}`}
                                        variant="top"
                                    />
                                ) :
                                null
                            }
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <p className="small">Authors: {book.authors}</p>
                                <Card.Text>{book.description}</Card.Text>
                                <Button
                                    className="btn-block btn-danger"
                                    onClick={() => handleDeleteBook(book.bookId)}
                                >
                                    Delete this Book!
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </CardColumns>
        </Container>
        </>
    )
}

export default SavedBooks
