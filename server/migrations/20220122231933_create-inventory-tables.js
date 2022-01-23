/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('inventory', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.float('qty').notNullable();
        table.string('unit').notNullable();
        table.timestamp('update_at').defaultTo(knex.fn.now());
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
    return knex.schema.dropTable('inventory');
};
