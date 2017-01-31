'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('auction', function(table) {
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable();
        table.foreign('course_id').references('id').inTable('courses').onDelete('cascade');
        table.integer('owner_id').unsigned().notNullable();
        table.foreign('owner_id').references('id').inTable('users').onDelete('cascade');
        table.integer('top_bid').notNullable();
        table.dateTime('tee_time').notNullable();
        table.dateTime('auction_ends').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('auction')
    ]);
};
