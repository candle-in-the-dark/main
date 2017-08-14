'use strict';

const express = require('express');
const humps = require('humps');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();

router.get('/maps/:id', (req, res, next) => {
  console.log("hello map!")
  knex('maps')
    .where('id', req.params.id)
    .first()
    .then((map) => {
      res.send(map)
    })
    .catch((err) => next(err));
});

router.get('/maps', (req, res, next) => {
  console.log("hello map!")
  knex('maps')
    .then((maps) => {
      res.send(maps)
    })
    .catch((err) => next(err));
})
