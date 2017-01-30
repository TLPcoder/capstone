'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
            id: 1,
            first_name: 'Trevor',
            last_name: 'Pellegrini',
            username: 'TPslicer',
            email: 'trevor@gmail.com',
            hashed_password: 'password',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            id: 2,
            first_name: 'Gary',
            last_name: 'Pellegrini',
            username: 'Gary',
            email: 'gary@gmail.com',
            hashed_password: 'password',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            id: 3,
            first_name: 'Brandon',
            last_name: 'Pellegrini',
            username: 'BP',
            email: 'brandon@gmail.com',
            hashed_password: 'password',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        })
      ]);
    });
};
