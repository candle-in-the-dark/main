
const scores = [
  {
    "score": 10,
    "map_id": 1,
    "user_id": 2,
    "quest": false

  },
  {
    "score": 110,
    "map_id": 2,
    "user_id": 2,
    "quest": false
  },
  {
    "score": 120,
    "map_id": 3,
    "user_id": 1,
    "quest": false
  },
  {
    'score': 400,
    'map_id': 3,
    'user_id': 1,
    'quest': true
  },
  {
    'score': 410,
    'map_id': 3,
    'user_id': 1,
    'quest': true
  },
  {
    'score': 100,
    'map_id': 2,
    'user_id': 2,
    'quest': false
  },
  {
    'score': 210,
    'map_id': 3,
    'user_id': 2,
    'quest': true
  },

];

exports.seed = function(knex, Promise) {
  return knex('scores').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('scores_id_seq', 1, false);"
      )
    })
    .then(() => {
      return knex('scores').insert(scores);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores));"
      );
    });
};
