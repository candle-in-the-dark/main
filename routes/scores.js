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

router.post('/scores', authorize, (req, res, next) => {
  console.log(req.claim)
  const toInsert = {'map_id':req.body.mapId, 'score':req.body.endTime, 'user_id': req.claim.userId}
  knex('scores').insert(toInsert, '*')
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
})

//write a patch route that updates high score if they beat teir prior high score

module.exports = router;
