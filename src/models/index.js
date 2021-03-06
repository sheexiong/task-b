const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    pool: dbConfig.POOL,
});

const Quote = require('./quote')(sequelize, Sequelize);

module.exports = {
    sequelize,
    Sequelize,
    Quote,
};
