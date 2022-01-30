const express = require('express');
const { authorize } = require('../Middleware/Authorize');
const { addTransaction } = require('../Controllers/TransactionsController');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .post(addTransaction)

module.exports = router;