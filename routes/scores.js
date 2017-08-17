'use strict';

const express = require('express');
const humps = require('humps');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Can not log high score, you are not logged in!'));
    }
    req.claim = payload;
    return next();
  });
};

router.get('/user/scores/:id', authorize, (req, res, next) => {
  knex('scores').where('user_id', req.claim.userId).andWhere('map_id', req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

router.get('/usernames/scores', (req, res, next) => {
  knex('scores').innerJoin('users', 'users.id', 'scores.user_id').select('username', 'score', 'map_id', 'quest')

    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

router.get('/usernames/scores/quest', (req, res, next) => {
  console.log('in quest route')
  knex('scores').where('map_id', 3).andWhere('quest', true).innerJoin('users', 'users.id', 'scores.user_id').select('username', 'score')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

router.get('/usernames/scores/:mapId',(req, res, next) => {
  knex('scores').where('map_id', req.params.mapId).innerJoin('users', 'users.id', 'scores.user_id').select('username', 'score', 'quest')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

router.patch('/scores', authorize, (req, res, next) => {
  const userId = req.claim.userId;
  const mapId = req.body.mapId;
  const score = req.body.score;
  knex('scores').where('map_id', mapId).andWhere('user_id', userId)
    .update({'score': score, 'quest': false})
    .then((result) => {
      return res.send();
    })
    .catch((err) => {
      return next(err);
    })
})

router.post('/scores/quest', authorize, (req, res, next) => {
  const toInsert = {'map_id':3, 'score':req.body.score, 'user_id':req.claim.userId, 'quest':true}
  knex('scores').insert(toInsert, '*')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err)
    })
})

router.post('/scores', authorize, (req, res, next) => {
  const toInsert = {'map_id':req.body.mapId, 'score':req.body.score, 'user_id': req.claim.userId, 'quest': false}
  knex('scores').insert(toInsert, '*')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

module.exports = router;
