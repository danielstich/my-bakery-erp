/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.string('password_hash').notNullable();
        table.timestamp('updated_on').defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('users', table => {
      table.dropColumns('password_hash', 'updated_on');
  })
};
