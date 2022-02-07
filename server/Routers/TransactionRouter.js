const express = require('express');
const { authorize } = require('../Middleware/Authorize');
const { getJournalEntries, addTransaction, deleteTransaction, getTransactions, getAllJournalEntries } = require('../Controllers/TransactionsController');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .post(addTransaction)
    .get(getTransactions)

router.route('/:id')
    .delete(deleteTransaction)

router.route('/:id/ledger')
    .get(getJournalEntries)

router.route('/ledger')
    .get(getAllJournalEntries);

module.exports = router;