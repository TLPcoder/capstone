'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bids').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('bids').insert({
            id: 1,
            bider_id: 3,
            auctioner_id:1,
            bid_amount: 80
        }),
        knex('bids').insert({
            id: 2,
            bider_id: 2,
            auctioner_id:1,
            bid_amount:95
        }),
        knex('bids').insert({
            id: 3,
            bider_id: 1,
            auctioner_id:3,
            bid_amount:100
        }),
        knex('bids').insert({
            id: 4,
            bider_id: 2,
            auctioner_id:3,
            bid_amount: 120
        }),
      ]);
    });
};
