'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auction').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('auction').insert({
            id: 1,
            course_id: 1,
            owner_id: 1,
            tee_time: new Date('2017-02-20 8:30:00 UTC'),
            'auction_ends': new Date('2017-02-18 24:00:00 UTC')
        }),
        knex('auction').insert({
            id: 2,
            course_id: 2,
            owner_id: 2,
            tee_time: new Date('2017-02-20 8:30:00 UTC'),
            'auction_ends': new Date('2017-02-18 24:00:00 UTC')
        }),
        knex('auction').insert({
            id: 3,
            course_id: 3,
            owner_id: 3,
            tee_time: new Date('2017-02-20 8:30:00 UTC'),
            'auction_ends': new Date('2017-02-18 24:00:00 UTC')
        })
      ]);
    });
};
