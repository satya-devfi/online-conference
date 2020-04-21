var express = require("express");
var router = express.Router();
var models = require("../../db/model");
var validation = require("../../validations/api/api_validations");

router.post("/create", createMessage);
router.get("/getall", getAllMessages);



async function getAllMessages(req, res, next) {
    try {
        // Save Tutorial in the database
        models.messages.findAll({
                include: [{
                    model: models.users,
                }, {
                    model: models.messages,
                }]
            })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while get the message."
                });
            });
    } catch (error) {
        res.status(400).json(error);
    }
}
async function createMessage(req, res, next) {
    try {

        // await validation.checkUserBody(req.body);
        const MessageData = {
            // id: req.body.id,
            // userIdUsers: req.body.user,
            messageId: req.body.messageId,
            userId: req.body.userId,
            message_text: req.body.message_text,
        };

        models.messages.create(MessageData)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the message."
                });
            });
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = router;