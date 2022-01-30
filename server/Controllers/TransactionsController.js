const knex = require('knex')(require('../knexfile').development);
const { createJournalEntries } = require("../DAO/LedgerDAO");
const { createTransaction } = require("../DAO/TransactionsDao");

// get transactions per user
// get single transaction /w journal entry

// add transaction w/ journal entry

exports.addTransaction = (req, res) => {
    const { transaction, journals } = req.body;
    transaction.user_id = req.user.id;
    
    knex.transaction(trx => {
        let promise = createTransaction(transaction, trx);
        if (promise instanceof Error) throw promise;
        return promise
        .then(ids => {
            const newJournals = journals.map(je => {
                je.trx_id = ids[0];
                je.user_id = req.user.id;
                return je;
            })

            let promise = createJournalEntries(newJournals, trx);
            if (promise instanceof Error) throw promise;
            return promise;
        })
        .then((ids) => {
            console.log(ids)
        })
        .catch(error => {
            throw error;
        })
    })
    .then(() => {
        res.status(200).json({success: 'Transaction was recorded'})
    })
    .catch(error => {
        if (error.sqlMessage) return res.status(400).json({error: error.sqlMessage})
        res.status(400).json({error: error.message})
    })
}

// delete transaction w/ journal entry

// edit transaction w/ journal entry