// Update with your config settings.
'use strict';
module.exports = {

  development: {
    client: 'postgresql',
    connection: "postgres://localhost/golf-bid-dev",
       pool: {
           min: 1,
           max: 1
       }
  },
  test: {
        client: 'postgresql',
        connection: "postgres://localhost/golf-bid-test",
        pool: {
            min: 1,
            max: 1
        }
    }
};
