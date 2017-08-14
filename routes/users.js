'use strict';

const express = require('express');
const humps = require('humps');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();

router.post('/users', (req, res, next) => {
  console.log('hello')
  const email = req.body.email;
  console.log(req.body);
  knex('users').where('email', email).first()
    .then((row) => {
      if (row) {
        return next(boom.create(200, 'Email is already registerd to a user.'))
      }
      bcrypt.hashPassword(req.body.password, 12)
        .then((password) => {

        }
    })
  const newUser = {'email': req.body.email, 'username': req.body.username}
})
