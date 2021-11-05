import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import Navigation from './components/Navigation'

const client = new ApolloClient({
    request: operation => {
        const token = localStorage.getItem('id_token')
        operation.setContext({
            headers: { authorization: token ? `Bearer ${token}` : '' }
        })
    },
    uri: 'http://localhost:4000/graphql' || 'https://vast-brushlands-83091.herokuapp.com/'
})

const App = () => {
    return(
        <ApolloProvider client={client}>
            <BrowserRouter>
            <Navigation />
                <Routes>
                    <Route exact path='/' element={<SearchBooks />} />
                    <Route exact path='/saved' element={<SavedBooks />} />
                    <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App