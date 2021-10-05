'use strict';
const config = require('./constant');
const sequelize = require('sequelize');
const dbInstance = new sequelize(config.POSTGRES_DB_URL, {
    logging: (log) => {
        //console.log(log);
    }, pool: {
        max: 300,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Op = sequelize.Op;

const channel = require('../model/channel')(dbInstance, sequelize);
const message = require('../model/message')(dbInstance, sequelize);

module.exports = { Op, dbInstance, channel, message }