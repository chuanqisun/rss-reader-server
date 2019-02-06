const Sequelize = require('sequelize');
const path = require('path');

const connection = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: path.join(__dirname, 'database.sqlite')
});

const isConnected = new Promise(resolve => {
  connection
  .authenticate()
  .then(() => {
    resolve(true);
  })
  .catch(err => {
    resolve(false);
  });
});

module.exports = {
  isConnected,
  connection,
}