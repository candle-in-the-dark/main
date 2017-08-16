'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', (table) => {
    table.increments();
    table.json('map_data').notNullable().defaultTo(JSON.stringify([]));
    table.integer('hero_x').notNullable();
    table.integer('hero_y').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
