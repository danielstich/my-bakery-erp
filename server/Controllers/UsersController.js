const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const saltRounds = process.env.SALT_ROUNDS;
const SECRET = process.env.JWT_SECRET;

const users = {}

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'Email or Password is missing'});
    if (users[email]) return res.status(400).json({error: 'User already Exists'});

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser ={
        name,
        email,
        hash
    }
    users[email] = newUser;

    res.status(201).send({success: 'User was created'})
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'Email or Password is missing'});
    if (!users[email]) return res.status(400).json({error: 'User not found'})
    const hash = users[email].hash;
    const passwordIsValid = await bcrypt.compare(password, hash);

    if (!passwordIsValid) return res.status(401).json({error: 'Password is invalid'});

    const user = users[email];
    const token = jwt.sign(user, SECRET);

    res.status(200).json({success: 'Login Succesful', token: token})
}