'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('courses', function(table) {
        table.increments('id').primary();
        table.string('name').defaultTo('').notNullable();
        table.text('description').defaultTo('').notNullable();
        table.string('image').defaultTo('').notNullable();
        table.string('address').defaultTo('').notNullable();
        table.string('city').defaultTo('').notNullable();
        table.string('country').defaultTo('').notNullable();
        table.string('state').defaultTo('').notNullable();
        table.integer('zip').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('courses')
    ]);
};
