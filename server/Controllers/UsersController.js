const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile').development);

require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'Email or Password is missing'});
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser ={
        name,
        email,
        password_hash
    }

    knex('users')
        .insert(newUser)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(error => {
            console.log(error.code)
            return res.status(400).json({error: 'Error creating user: ' + error.sqlMessage})
        })
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'Email or Password is missing'});
    

    knex.select('name', 'email', 'password_hash', 'id')
        .from('users')
        .where({email: email})
        .then(async data => {
            const user = {...data[0]}
            if (!user.email) throw {status: 400, error: 'User not found'};
            
            const hash = user.password_hash;
            const passwordIsValid = await bcrypt.compare(password, hash);
            if (!passwordIsValid) throw {status: 401, error: 'Password is invalid'} ;
            
            
            delete user.password_hash;
            const token = jwt.sign(user, SECRET);
        
            res.status(200).json({success: 'Login Succesful', token: token, user: user})
        })
        .catch(error => {
            if (error.status) {
                return res.status(error.status).json({error: error.error});
            }
            res.status(400).json({error: 'Error retrieving user: ' + error.sqlMessage})
        })
}

exports.deleteUser = async (req, res) => {
    console.log(req.user)

    const email = req.user.email;
    const password = req.body.password;

    knex.select('email', 'password_hash')
        .from('users')
        .where({email: email})
        .then(async data => {
            const user = {...data[0]}
            if (!user.email) throw {status: 400, error: 'User not found'};
            
            const hash = user.password_hash;
            const passwordIsValid = await bcrypt.compare(password, hash);
            if (!passwordIsValid) throw {status: 401, error: 'Password is invalid'} ;
            
            return knex('users').where({email: email}).del();
        })
        .then(data => {
            console.log(data);
            if (!data) throw {status: 400, error: 'User not delete'}
            res.status(200).json({success: 'User Deleted'})
        })
        .catch(error => {
            if (error.status) {
                return res.status(error.status).json({error: error.error});
            }
            res.status(400).json({error: 'Error deleting user: ' + error.sqlMessage})
        })
}

exports.getUser = (req, res) => {
    res.json(req.user)
}