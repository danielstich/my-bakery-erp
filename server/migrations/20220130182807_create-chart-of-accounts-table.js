
exports.up = function(knex) {
    return knex.schema.createTable('chart_of_accounts', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.timestamp('create_at').defaultTo(knex.fn.now());
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('chart_of_accounts');
};
