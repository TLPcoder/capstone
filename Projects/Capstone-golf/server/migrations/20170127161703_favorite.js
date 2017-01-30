'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favorite', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
        table.integer('course_id').unsigned().notNullable();
        table.foreign('course_id').references('id').inTable('courses').onDelete('cascade');
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('favorite')
    ]);
};
