var express = require('express')
var router = express.Router()

router.use('/user', require("./api/user"))
router.use('/message', require("./api/messages"))

module.exports = router;