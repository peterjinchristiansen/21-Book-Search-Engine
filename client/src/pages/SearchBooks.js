import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Card } from 'react-bootstrap'

import Auth from '../utils/Auth'
import { searchGoogleBooks } from '../utils/API'
import { saveBookIds, getSavedBookIds } from '../utils/localStorage'
import { SAVE_BOOK } from '../utils/Mutations'
import { useMutation } from '@apollo/react-hooks'

const SearchBooks = () => {
    const [searchedBooks, setSearchedBooks] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [saveBook] = useMutation(SAVE_BOOK)
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds())

    useEffect(() => {
        return () => saveBookIds(savedBookIds)
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        if (!searchInput) {
            return false
        }
        try {
            const response = await searchGoogleBooks(searchInput)
            if (!response.ok) {
                throw new Error('something went wrong!')
            }
            const { items } = await response.json()
                const bookData = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks?.thumbnail || '',
                link: book.volumeInfo.canonicalVolumeLink || ''
            }))
            setSearchedBooks(bookData)
            setSearchInput('')
        } catch (error) {
            console.error('ERROR => ', error)
        }
    }

    const handleSaveBook = async (bookId) => {
        const bookToSave = searchedBooks.filter((book) => book.bookId === bookId)
        const token = Auth.loggedIn() ? Auth.getToken() : null
        if (!token) {
            return false
        }
        try {
            const { data } = await saveBook({
                variables: {...bookToSave[0]}
            })
            setSavedBookIds([...savedBookIds, data])
        } catch (err) {
            console.error('ERROR => ', err)
        }
    }

    return (
        <>
            <Container>
                <h1>Search for Books!</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Col xs={12} md={8}>
                        <Form.Control
                            name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text'
                            size='lg'
                            placeholder='Search for a book'
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Button type='submit' variant='success' size='lg'>
                            Submit Search
                        </Button>
                    </Col>
                </Form>
            </Container>
            <Container>
            <h2>
                {
                    searchedBooks.length ?
                    `Viewing ${searchedBooks.length} results:`:
                    'Search for a book to begin'
                }
            </h2>
            {searchedBooks.map((book) => {
                return (
                    <Card key={book.bookId} border='dark'>
                        {
                            book.image ?
                            (<Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />)
                            : null
                        }
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <p className='small'>Authors: {book.authors}</p>
                            <Card.Text>{book.description}</Card.Text>
                            {
                                Auth.loggedIn() &&
                                (
                                    <Button
                                        className='btn-block btn-info'
                                        onClick={() => handleSaveBook(book.bookId)}>
                                    </Button>
                                )
                            }
                        </Card.Body>
                    </Card>
                )
            })}
            </Container>
        </>
    )
}

export default SearchBooks