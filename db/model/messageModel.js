const {
    Model,
    DataTypes,
    Deferrable
} = require("sequelize");
var User = require("../../db/model/userModel")
module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        messageId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'messages',
                key: 'id',
            }
        },
        message_text: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });

    return Message;
};