'use strict';

const UserModel = require('../../models/UserModel');

/**
* Swagger Controller method for GET /users Endpoint
*/
async function getUsers(req, res) {
  const users = await UserModel.query().select();
  res.status(200).json(users).end();
}

/**
* Swagger Controller method for GET /users/{id} Endpoint
*/
async function getUserById(req, res) {
  const userId = req.swagger.params.id.value;
  const user = await UserModel.query().select().where({ id: userId }).first();
  res.status(200).json(user).end();
}

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById
}
