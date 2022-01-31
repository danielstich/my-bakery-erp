const express = require('express');
const { authorize } = require('../Middleware/Authorize');
const { getJournalEntries, addTransaction, deleteTransaction, getTransactions } = require('../Controllers/TransactionsController');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .post(addTransaction)
    .get(getTransactions)

router.route('/:id')
    .delete(deleteTransaction)

router.route('/:id/ledger')
    .get(getJournalEntries)

module.exports = router;