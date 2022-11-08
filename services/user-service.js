/* eslint-disable linebreak-style */
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
  getType,
  updateMapping,
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
      } else {
        resolve(res);
      }
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
 * getType - Type of Users
 * @return {Promise}
 */
async function getType() {
  return new Promise((resolve, reject)=>{
    const sql = `Select * From user_type;`;
    db.query(sql, (err, res, fields)=>{
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}


/**
 * create
 * @param {*} params Params required for user type
 */
async function create(params) {
  return new Promise(async (resolve, reject) => {
    try {
      const val = [params.name, params.password, params.phone, params.email];

      const sql = `INSERT INTO flightdb.User
        (name, password, phone, email)
        VALUES(?,?,?,?)`;

      db.query(sql, val, async (err, res, fields) => {
        if (err) {
          syslog.log(err);
        } else {
          // Creates Mapping in user_x_type Table;
          await createMapping(res.insertId);
          resolve(res);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * createMapping
 * @param {*} userId User Object
 * @param {*} typeId 1-Admin, 2-Normal User
 * @return {Promise}
 */
async function createMapping(userId, typeId='2') {
  return new Promise((resolve, reject)=>{
    try {
      const sql = `INSERT INTO flightdb.User_X_Type
      (user_id, usertype_id)
      VALUES (?,?)`;
      db.query(sql, [userId, typeId], (err, res, fields)=>{
        resolve('User Mapped');
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * updateMapping
 * @param {*} userId User Object
 * @param {*} typeId 1-Admin, 2-Normal User
 * @return {Promise}
 */
async function updateMapping(userId, typeId) {
  return new Promise((resolve, reject)=>{
    try {
      const sql = `UPDATE flightdb.User_X_Type
      SET usertype_id=?
      WHERE user_id=?`;
      db.query(sql, [typeId, userId], (err, res, fields)=>{
        resolve('User Mapped');
      });
    } catch (error) {
      reject(error);
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
        } else {
          syslog.log(res);
        }
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
        } else {
          syslog.log(res);
        }
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
      } else {
        syslog.log(res);
        resolve(res);
      }
    });
  });
}
