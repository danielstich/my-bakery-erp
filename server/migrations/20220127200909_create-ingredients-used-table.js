exports.up = function(knex) {
    return knex.schema.createTable('ingredients_used', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.float('amount').notNullable();
        table.string('unit').notNullable();
        table
            .integer('batch_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('batches')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ingredients_used');
};
