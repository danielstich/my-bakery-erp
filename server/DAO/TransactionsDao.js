const knex = require('knex')(require('../knexfile').development);

// create transaction

exports.createTransaction = (transaciton, ktrx) => {
    if (!transaciton.description || !transaciton.date || !transaciton.user_id) {
        return new Error('Missing Transaction Fields')
    }
    const promise = knex('transactions').insert(transaciton)
    if (ktrx) return promise.transacting(ktrx)           
    return promise;
}

// read transactions

// read single transaction

// update transaction

// delete transaction

