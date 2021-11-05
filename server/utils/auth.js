const jwt = require('jsonwebtoken')

module.exports = {
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim()
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, 'mysecretsshhhhh', { maxAge: '2h' })
            req.user = data
        } catch {
            console.log('Invalid token')
        }
        return req
    },
    signToken: ({ username, email, _id }) => {
        console.log('hi')
        const payload = { username, email, _id }
        return jwt.sign({ data: payload }, 'mysecretsshhhhh', { expiresIn: '2h' })
    }
}
