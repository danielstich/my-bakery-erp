exports.up = function(knex) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id').primary();
        table.string('decription').notNullable();
        table.date('date').notNullable();
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table.timestamp('create_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
