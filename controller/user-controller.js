/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userService = require('../services/user-service');
module.exports = router;


// Routes for User Controller
router.get('/:id', getById);
router.get('/type', getType);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/create', create);

// Routes Functions

/**
 * getAll Gets All User
 * @param {*} req Req Body
 * @param {*} res Response Object
 * @param {*} next Next Callable Method
 */
async function getAll(req, res, next) {
  userService.getAll()
      .then((users) => {
        res.send(users);
      })
      .catch((err)=>{
        console.log(err);
      });
}


/**
 * getById Get user by it's Id
 * @param {*} req Req Body
 * @param {*} res Response Object
 * @param {*} next Next Callable Method
 */
function getById(req, res, next) {
  userService.getById(req.params.id)
      .then((user) => res.send(user))
      .catch(next);
}

/**
 * create Adds new user to Database
 * @param {*} req Req Body
 * @param {*} res Response Object
 * @param {*} next Next Callable Method
 */
function create(req, res, next) {
  userService.create(req.body)
      .then(() => res.json({message: 'User created'}))
      .catch(next);
}


/**
 * Get Types of Users
 * @param {*} req Req Body
 * @param {*} res Response Object
 * @param {*} next Next Callable Method

 */
function getType(req, res, next) {
  userService.getType().then((userType)=>{
    res.send(userType);
  }).catch((err)=>{
    res.send(err);
  });
}


/**
 * update Updates User Information
 * @param {*} req Req Body
 * @param {*} res Response Object
 * @param {*} next Next Callable Method
 */
function update(req, res, next) {
  userService.update(req.params.id, req.body)
      .then(() => res.json({message: 'User updated'}))
      .catch(next);
}

/**
 * _delete Deltes the user
 * @param {*} req Req Body
 * @param {*} res Response Object
 * @param {*} next Next Callable Method
 */
function _delete(req, res, next) {
  userService.delete(req.params.id)
      .then(() => res.json({message: 'User deleted'}))
      .catch(next);
}
