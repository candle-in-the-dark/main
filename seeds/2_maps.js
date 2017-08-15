
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('maps_id_seq', 1, false);"
      )
    })
    .then(function () {
      // Inserts seed entries
      return knex('maps').insert([
        {
          id: 1,
          map_data: JSON.stringify([[
              3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
              3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3,
              3, 3, 3, 3, 1, 1, 1, 3, 1, 3, 1, 1,
              3, 1, 3, 1, 1, 3, 3, 3, 1, 3, 1, 3,
              3, 1, 3, 1, 3, 3, 1, 1, 1, 3, 1, 3,
              3, 1, 3, 1, 1, 3, 1, 3, 3, 3, 1, 3,
              3, 1, 3, 3, 1, 3, 1, 1, 1, 1, 1, 3,
              3, 1, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3,
              3, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 3,
              3, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3,
              3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3,
              3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
          ], [
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
          ], [
              0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]]),
            hero_x: 96,
            hero_y: 16
          },{
          id: 2,
          map_data: JSON.stringify([[
            3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            1, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3,
            3, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3,
            3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3,
            3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3,
            3, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 3,
            3, 1, 3, 3, 1, 3, 1, 1, 1, 3, 3, 3,
            3, 1, 3, 1, 1, 3, 3, 3, 1, 1, 1, 3,
            3, 1, 1, 1, 3, 3, 1, 1, 1, 3, 1, 3,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ], [
            0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ], [
            0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]]),
        hero_x: 16,
        hero_y: 144
      },{
          id: 3, map_data: JSON.stringify([[
            3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3,
            3, 3, 3, 3, 1, 1, 1, 3, 1, 3, 1, 1,
            3, 1, 3, 1, 1, 3, 3, 3, 1, 3, 1, 3,
            3, 1, 3, 1, 3, 3, 1, 1, 1, 3, 1, 3,
            3, 1, 3, 1, 1, 3, 1, 3, 3, 3, 1, 3,
            3, 1, 3, 3, 1, 3, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 3, 3, 3, 1, 3, 1, 3,
            3, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 3,
            3, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3,
            3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ], [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ], [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]]),
        hero_x: 96,
        hero_y: 16
      }
      ]);

    })
    .then(() => {
      return knex.raw(
        "SELECT setval('maps_id_seq', (SELECT MAX(id) FROM maps));"
      );
    });
};
