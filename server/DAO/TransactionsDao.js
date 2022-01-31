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
exports.readTransactions = (user_id, ktrx) => {
    const promise = knex('transactions').where({user_id}).del();
    if (ktrx) return promise.transacting(ktrx);
    return promise;
}

// delete transaction
exports.deleteTransaction = (user_id, id, ktrx) => {
    const promise = knex('transactions').where({id, user_id}).del();
    if (ktrx) return promise.transacting(ktrx);
    return promise;
}

// update transaction
exports.updateTransaction = (transaciton, ktrx) => {
    const {id, user_id} = transaciton;
    if (!transaciton.description || !transaciton.date || !transaciton.user_id) {
        return new Error('Missing Transaction Fields')
    }
    const promise = knex('transactions').where({id, user_id}).update(transaciton)
    if (ktrx) return promise.transacting(ktrx)           
    return promise;
}