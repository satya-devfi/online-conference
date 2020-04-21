var mongoose = require("mongoose");

const Shema = mongoose.Schema();

module.exports = {
    name: String,
    email: String,
    password: String,
    description: String
}