/* eslint-disable no-throw-literal */
const db = require('../dbConnection');
const Logger = require('../logger');
const syslog = new Logger().getInstance();

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

/**
 *
 * @return {userlist} List of all users
 */
async function getAll() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM flightdb.User`;

    db.query(sql, {}, async (err, res, field) => {
      if (err) {
        syslog.log(err);
      }
      resolve(res);
    });
  });
}


/**
 * getById
 * @param {*} id UserId
 * @return {UserObject} Return User Object
 */
async function getById(id) {
  return new Promise(async (resolve, reject) => {
    await getUser(id).then((res) => {
      resolve(res);
    }).catch((res) => {
      console.log(res);
    });
  });
}


/**
 * create
 * @param {*} params Params required for user type
 */
async function create(params) {
  return new Promise(async (resolve, reject) => {
    // validate
    params = {
      id: 1,
      name: 'Vishal', password: 'root',
      phone: '5146538200', email: 'abcd@gmail.com',
    };
    const user = await getUser(params.id);
    if (user) {
      resolve(user);
    } else {
      const val = [params.name, params.password, params.phone, params.email];

      const sql = `INSERT INTO flightdb.User
        (name, password, phone, email)
        VALUES(?,?,?,?)`;

      db.query(sql, val, (err, res, fields) => {
        if (err) {
          syslog.log(err);
        }
        resolve(res);
      });
    }
  });
}


/**
 * update
 * @param {*} id id of user
 * @param {*} params params of user
 */
async function update(id, params) {
  return new Promise(async (resolve, reject)=>{
    const user = await getUser(id);
    const sql = `UPDATE flightdb.User
    SET ? WHERE id = ?`;

    // Params should be something like this
    params = {
      name: 'VishalKarmakar', password: 'root123',
      phone: '5146538201', email: 'abcde@gmail.com',
    };

    if (user) {
      db.query(sql, [params, 2], (err, res, fields) => {
        if (err) {
          syslog.log(err);
        }
        syslog.log(res);
      });
    }
  });
}


/**
 *
 * @param {*} id Id of User
 */
async function _delete(id) {
  return new Promise(async (resolve, reject)=>{
    const user = await getUser(id);
    if (user) {
      const sql = `DELETE FROM flightdb.User
  WHERE id=?`;
      db.query(sql, id, (err, res, fields) => {
        if (err) {
          syslog.log(err);
        }
        syslog.log(res);
      });
    }
  });
}


/**
 *
 * @param {*} id Id of user
 * @return {UserObject}
 */
async function getUser(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name, password, phone, email
  FROM flightdb.User Where id = ?
  `;

    db.query(sql, id, (err, res, fields) => {
      if (err) {
        syslog.log(err);
      }
      syslog.log(res);
      resolve(res);
    });
  });
}
