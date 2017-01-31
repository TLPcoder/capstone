'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bids', function(table) {
        table.increments('id').primary();
        table.integer('bider_id').unsigned().notNullable();
        table.foreign('bider_id').references('id').inTable('users').onDelete('cascade');
        table.integer('auction_id').unsigned().notNullable();
        table.foreign('auction_id').references('id').inTable('auction').onDelete('cascade');
        table.integer('bid_amount').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('bids')
    ]);
};
