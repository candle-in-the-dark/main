'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', (table) => {
    table.increments();
    table.json('map_data').notNullable().default(JSON.stringify([]));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
