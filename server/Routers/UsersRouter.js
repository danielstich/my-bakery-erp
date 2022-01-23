const express = require('express');
const {signup, login, deleteUser} = require('../Controllers/UsersController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/delete', authorize);

router.post('/signup', signup);
router.post('/login', login);
router.delete('/delete', deleteUser)

module.exports = router;