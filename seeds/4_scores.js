
const scores = [
  {
    'score': 10,
    'map_id': 1,
    'user_id': 2
  },
  {
    'score': 110,
    'map_id': 2,
    'user_id': 2
  },
  {
    'score': 120,
    'map_id': 2,
    'user_id': 1
  }
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
