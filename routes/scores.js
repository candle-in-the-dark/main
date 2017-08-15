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

router.get('/scores', authorize, (req, res, next) => {
  knex('scores').where('user_id', req.claim.userId).andWhere('map_id', req.body.mapId)
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
  console.log(`Score:${score} and userId:${userId} and mapId${mapId}`)
  knex('scores').where('map_id', mapId).andWhere('user_id', userId)
    .update('score', score)
    .then((result) => {
      return res.send();
    })
    .catch((err) => {
      return next(err);
    })
})

router.post('/scores', authorize, (req, res, next) => {
  const toInsert = {'map_id':req.body.mapId, 'score':req.body.endTime, 'user_id': req.claim.userId}
  console.log(toInsert)
  knex('scores').insert(toInsert, '*')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

module.exports = router;
