const usersSeed = require('../seed_data/users');

exports.seed = (knex) => {
    return knex('users')
        .del()
        .then(() => {
            return knex('users').insert(usersSeed);
        })
};