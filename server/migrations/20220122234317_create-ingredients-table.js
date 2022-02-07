/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ingredients', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.float('amount').notNullable();
        table.string('unit').notNullable();
        table.timestamp('update_at').defaultTo(knex.fn.now());
        table
            .integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ingredients')
};
