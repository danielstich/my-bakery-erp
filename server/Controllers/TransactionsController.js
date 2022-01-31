const knex = require('knex')(require('../knexfile').development);
const { createJournalEntries, journalsDAO } = require("../DAO/LedgerDAO");
const { createTransaction, transactionDAO } = require("../DAO/TransactionsDao");
const { getAllItemsHandler, deleteItemHandler } = require('./ResponseHandler');


// get transactions per user
exports.getTransactions = (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    const promise = transactionDAO('read', id, user_id, null, null);
    getAllItemsHandler(res, promise, 'transactions');
}

// add transaction w/ journal entry
exports.addTransaction = (req, res) => {
    const { transaction, journals } = req.body;
    transaction.user_id = req.user.id;
    
    knex.transaction(ktrx => {
        let promise = createTransaction(transaction, ktrx);
        if (promise instanceof Error) throw promise;
        
        return promise
        .then(ids => {
            const newJournals = journals.map(je => {
                je.trx_id = ids[0];
                je.user_id = req.user.id;
                return je;
            })

            let promise = createJournalEntries(newJournals, ktrx);
            if (promise instanceof Error) throw promise;
            return promise;
        })
        .catch(error => {
            throw error;
        })
    })
    .then(() => {
        res.status(200).json({success: `Transaction was recorded`})
    })
    .catch(error => {
        if (error.sqlMessage) return res.status(400).json({error: error.sqlMessage})
        res.status(400).json({error: error.message})
    })
}

// delete transaction w/ journal entry
exports.deleteTransaction = (req, res) => {
    const trx_id = req.params.id;
    const user_id = req.user.id;
    const promise = transactionDAO('delete', trx_id, user_id, null, null);
    deleteItemHandler(res, promise, 'transaction');
}

// get Journal Entries

exports.getJournalEntries = (req, res) => {
    const trx_id = req.params.id;
    const user_id = req.user.id;
    const promise = journalsDAO("read", user_id, trx_id, null, null);
    getAllItemsHandler(res, promise, 'journal entries')
}

// edit transaction w/ journal entry