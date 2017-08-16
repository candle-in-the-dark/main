'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.integer('score').notNullable();
    table.integer('map_id').references('maps.id').notNullable();
    table.boolean('quest').notNullable().defaultTo(false)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
