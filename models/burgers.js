//import our connection
const connection = require('./connection');

// create a function that reads from the burgers table
// SELECT * FROM burgers
const findAll = () => {
  // create a new Promise
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM burgers', function(err, dbBurgerData) {
      if (err) {
        // this will throw to a .catch()
        return reject(err);
      }
      // this will throw to a .then()
      return resolve(dbBurgerData);
    });
  });
};

// find a burger by id
// SELECT * FROM burgers WHERE id = ?
const findById = burgerId => {
  // create a new Promise
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM burgers WHERE id = ?', [burgerId], function(err, dbBurgerData) {
      if (err) {
        // this will throw to a .catch()
        return reject(err);
      }
      // this will throw to a .then()
      return resolve(dbBurgerData);
    });
  });
};

// CREATE/INSERT
// INSERT INTO burgers SET ? ({name: "burgerName"})
const create = burgerDataObj => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO burgers SET ?', [burgerDataObj], function(err, dbBurgerData) {
      if (err) {
        // this will throw to a .catch()
        return reject(err);
      }
      // this will throw to a .then()
      return resolve(dBurgerData);
    });
  });
};

// UPDATE burgers (set value of "devoured" to true or false)
// UPDATE burgers SET devoured = ? WHERE id = ? ([true, 2])
const update = (devouredValue, burgerId) => {
  return new Promise((resolve, reject) => {

    // set devouredValue to boolean true/false
    devouredValue = (devouredValue === "true") 
      ? true : false;

    connection.query("UPDATE burgers SET devoured = ? WHERE id = ?", [devouredValue, burgerId], function(err, dbBurgerData) {

      if (err) {
        return reject(err);
      }
      else if (dbBurgerData.changedRows === 0) {
        return reject({message: "You probably have the wrong ID"});
      }
      else {
        return resolve(dbBurgerData);
      }
    })
  })
}

// DELETE a burger
// DELETE FROM burgers WHERE id = ?
const remove = (burgerId) => {
  return new Promise((resolve, reject) => {

    connection.query("DELETE FROM burgers WHERE id = ?", [burgerId], function (err, dbBurgerData) {

      if (err) {
        return reject(err);
      }
      else if (dbBurgerData.affectedRows === 0) {
        return reject({ message: "You probably have the wrong ID" });
      }
      else {
        return resolve(dbBurgerData);
      }
    })
  })
}

// export all of our new functions as methods of an object
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};