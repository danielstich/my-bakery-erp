exports.up = function(knex) {
    return knex.schema.createTable('ledger', table => {
        table.increments('id').primary();
        table.date('date').notNullable();
        table.string('account').notNullable();
        table.string('debit_credit').notNullable();
        table.float('amount').notNullable();
        table.string('description');
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table
            .integer('trx_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('transactions')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('ledger');
};
