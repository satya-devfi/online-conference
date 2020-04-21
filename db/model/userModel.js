const {
    Model,
    DataTypes,
    Deferrable
} = require("sequelize");
const Message = require("../../db/model/messageModel")
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    })
    return User;

};