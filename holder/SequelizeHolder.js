const Sequelize = require('sequelize');
const databaseConfig = require('../config/databaseConfig');
const cls = require('continuation-local-storage');
Sequelize.cls =  cls.createNamespace('sunrise-sequelize-transaction');

var sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig);

module.exports = {
    sequelize : sequelize,
    Sequelize : Sequelize
}