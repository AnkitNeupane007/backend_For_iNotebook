const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Thisis@g@@d@ne'


const login = (req, res, next) => {
    // Get the user from JWT token and add id
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Access denied!!' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Access denied!!' })
    }
}


module.exports = login;