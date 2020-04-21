const express = require("express");
var cookieParser = require('cookie-parser');
const app = express();
var mongoose = require("mongoose");
var api = require("./routes/api_router");
var Sequelize = require('sequelize')
app.use(express.json());
app.use(cookieParser());


(async () => {
  let client = await mongoose.connect("mongodb://localhost:27017/chatbot", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    ////console.log("connect")
  } finally {
    console.log(`Mongodb connected`);
  }
})().catch((err) => {
  console.error("errrr" + err);
});

const db = require("./db/model");
db.sequelize.sync();



//set the template engine ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

//routes
app.use("/api", api);
app.get("/", (req, res) => {
  res.render("chat");
});

//Listen on port 3000
server = app.listen(3000);

//socket.io instantiation
const io = require("socket.io")(server);

//listen on every connection
io.on("connection", (socket) => {
  console.log("New user connected");

  //default username
  socket.username = "Anonymous";

  //listen on change_username
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  //listen on new_message
  socket.on("new_message", (data) => {
    //broadcast the new message
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username,
    });
  });

  //listen on typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", {
      username: socket.username,
    });
  });
});
module.exports = app;