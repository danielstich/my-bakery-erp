const knex = require('knex')(require('../knexfile').development);

exports.createJournalEntries = (journals, ktrx) => {
    let isError = false;
    let total = {D:0,C:0};
    let i = 0;
    for (; i < journals.length; i++) {
        let je = journals[i];
        total[je.debit_credit] = je.amount;
        if (!je.date || !je.account || !je.debit_credit || !je.amount || !je.trx_id || !je.user_id) {
            isError = true;
            break;
        }
    }
    if (isError) return new Error(`Journal Fields Missing, Line: ${i + 1}`);
    if (total.D !== total.C) return new Error("JE is out of Balance");
    
    const promise = knex('ledger').insert(journals);
    if (ktrx) return promise.transacting(ktrx);

    return promise;
}

exports.journalsDAO = (type, user_id, trx_id, journals, ktrx) => {
    if (type === 'create' || type === 'update') {
        let isError = false;
        let total = {D:0,C:0};
        let i = 0;
        for (; i < journals.length; i++) {
            let je = journals[i];
            total[je.debit_credit] = je.amount;
            if (!je.date || !je.account || !je.debit_credit || !je.amount || !je.trx_id || !je.user_id) {
                isError = true;
                break;
            }
        }
        if (isError) return new Error(`Journal Fields Missing, Line: ${i + 1}`);
        if (total.D !== total.C) return new Error("JE is out of Balance");
    }

    let promiseArray = [];
    let promise = ktrx ? knex('ledger').transacting(ktrx) : knex('ledger');
    if (type === 'create') return promise.insert(journals);
    else if (type === 'read') return knex('ledger').where({user_id, trx_id});
    else if (type === 'readAll') return knex('ledger').where({user_id});
    else if (type === 'update') promiseArray = journals.map(je => promise.where({id: je.id, user_id}).update(je));
    else if (type === 'delete') promiseArray = journals.map(je => promise.where({id: je.id, user_id}).del());   
    else return new Error('Wrong DAO Operation');

    return promiseArray;
}