const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

exports.authorize = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            console.log(error)
            return res.status(401).send({error: 'Not Authorized'})
        }
        // console.log(decoded);
        req.user = decoded;
        next();
    })
}