const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config();

const db = {};

const {
  DB_NAME,
  DB_USERNAME,
  DB_HOST,
  DB_PASSWORD
} = {
  DB_NAME: `${process.env.DB_NAME}`,
  DB_USERNAME: `${process.env.DB_USERNAME}`,
  DB_HOST: `${process.env.DB_HOST}`,
  DB_PASSWORD: `${process.env.DB_PASSWORD}`
}

console.log("DB_NAMeas", process.env.DB_NAME)

const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
      host: DB_HOST,
      dialect: 'mysql'
    }
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
