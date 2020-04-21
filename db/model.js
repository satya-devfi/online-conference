// var userModel = require('./model/userModel')

// module.exports = {
//     userModel: userModel
// }

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./model/userModel")(sequelize, Sequelize);
db.messages = require("./model/messageModel")(sequelize, Sequelize);
var msg = require("../db/model/messageModel")
var usr = require("../db/model/userModel")
// db.users.belongsTo(msg);
db.users.hasMany(db.messages);
db.messages.belongsTo(db.users)

// db.messages.hasMany(db.messages);
db.messages.belongsTo(db.messages)

module.exports = db;