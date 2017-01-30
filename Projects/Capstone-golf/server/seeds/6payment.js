'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('payment').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('payment').insert({
            id: 1,
            user_id: 1,
            credit_card_number: '4444555566667777',
            CVV: '123456789',
            expiration: new Date('2020-02-20 24:00:00 UTC'),
        }),
        knex('payment').insert({
            id: 2,
            user_id: 2,
            credit_card_number: '4444555566667777',
            CVV: '123456789',
            expiration: new Date('2020-02-20 24:00:00 UTC'),
        }),
        knex('payment').insert({
            id: 3,
            user_id: 3,
            credit_card_number: '4444555566667777',
            CVV: '123456789',
            expiration: new Date('2020-02-20 24:00:00 UTC'),
        })
      ]);
    });
};
