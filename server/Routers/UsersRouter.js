const express = require('express');
const {signup, login, deleteUser, getUser} = require('../Controllers/UsersController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/delete', authorize);

router.post('/signup', signup);
router.post('/login', login);
router.delete('/delete', deleteUser);
router.get('/', getUser);

module.exports = router;