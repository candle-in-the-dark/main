'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/candle_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/candle_dev'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './prod_seed/'
    }
  }
};
