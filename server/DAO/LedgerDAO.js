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