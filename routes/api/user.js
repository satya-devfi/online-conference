var express = require("express");
var router = express.Router();
var models = require("../../db/model");
var validation = require("../../validations/api/api_validations");
var db = require('../../db/model')

const User = require("../../db/model/userModel")
const Message = require("../../db/model/messageModel")
router.get("", (req, res) => {
  res.send("satya");
});

// User.hasMany("Message", {
//   as: "msg",
//   foreignKey: "user"
// });
// Message.belongsTo("User", {
//   as: "usr",
//   foreignKey: "user"
// });

router.post("/create", createUser);
router.get("/getall", getallUsers);
router.get("/login", loginUser);

async function getallUsers(req, res, next) {
  try {
    // Save Tutorial in the database
    models.users.findAll({
        include: [{
          model: db.messages,
        }]
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Tutorial."
        });
      });
  } catch (error) {
    res.status(400).json(error);
  }
}
async function createUser(req, res, next) {
  try {

    // await validation.checkUserBody(req.body);
    const message = {
      // id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    // Save user in the database
    models.users.create(message)
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
async function loginUser(req, res, next) {
  try {

    // await validation.checkUserBody(req.body);


    // check user in the database
    models.users.find({
        "email": req.body.userName,
        "password": req.body.password
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Tutorial."
        });
      });

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = router;