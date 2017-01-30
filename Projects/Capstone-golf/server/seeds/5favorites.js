'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorite').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('favorite').insert({
            id: 1,
            user_id: 1,
            course_id:2,
        }),
        knex('favorite').insert({
            id: 2,
            user_id: 1,
            course_id:3,
        }),
        knex('favorite').insert({
            id: 3,
            user_id: 2,
            course_id:1,
        }),
        knex('favorite').insert({
            id: 4,
            user_id: 2,
            course_id:3,
        }),
        knex('favorite').insert({
            id: 5,
            user_id: 3,
            course_id:1,
        }),
        knex('favorite').insert({
            id: 6,
            user_id: 3,
            course_id:2,
        }),
      ]);
    });
};
