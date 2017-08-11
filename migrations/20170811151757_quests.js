'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('quests', (table) => {
    table.increments();
    table.integer('map_id1').notNullable().references('maps.id').onDelete('CASCADE');
    table.integer('map_id2').notNullable().references('maps.id').onDelete('CASCADE');
    table.integer('map_id3').notNullable().references('maps.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quests')
};
