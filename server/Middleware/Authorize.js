const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

exports.authorize = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({error: 'Nott Authorized'});
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            console.log(error)
            return res.status(401).json({error: 'Not Authorized: token error'})
        }
        req.user = decoded;
        next();
    })
}