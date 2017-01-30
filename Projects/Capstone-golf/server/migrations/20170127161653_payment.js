'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('payment', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
        table.specificType('credit_card_number', 'char(60)').notNullable();
        table.specificType('CVV', 'char(60)').notNullable();
        table.dateTime('expiration').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('payment')
    ]);
};
