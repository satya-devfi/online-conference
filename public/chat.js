$(function () {
  //make connection
  var socket = io.connect("http://localhost:3000");

  //buttons and inputs
  var message = $("#message");
  var username = $("#username");
  var send_message = $("#send_message");
  var send_username = $("#send_username");
  var chatroom = $("#chatroom");
  var feedback = $("#feedback");
  var replay = $("#replay");
  var msgId = $("#msgId");
  var allusers = $("#allusers");
  var username = $("#username");

  //Emit message
  send_message.click(function () {
    socket.emit("new_message", {
      message: message.val(),
    });

    //Emit user
    socket.emit("change_username", {
      username: username.val().split("-")[1],
    });

    var data = {
      user: username.val().split("-")[0],
      message_text: message.val(),
    };
    if (replay.val()) {
      // data.ParentId = msgId.val();
      var data = {
        userId: username.val().split("-")[0],
        message_text: message.val(),
        ParentId: 17,
      };
    }
    $.ajax({
      type: "post",
      url: "http://localhost:3000/api/message/create",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (res) {
        console.log(res);
        chatroom.append(
          "<div class='col-sm-12 message-main-sender'><div class='sender'> <div class='message-text'><input type='hidden' id='msgId_'" +
            res.id +
            " value=" +
            res.id +
            ">" +
            username.val().split("-")[1] +
            ": " +
            res.message_text +
            "<button onclick='replayMsg(" +
            res.id +
            ")'>...</button></div></div></div>"
        );
      },
    });
  });

  //Listen on new_message
  socket.on("new_message", (data) => {
    feedback.html("");
    message.val("");
    // chatroom.append(
    //   "<div class='col-sm-12 message-main-sender'><div class='sender'> <div class='message-text'>" + data.username + ": " + data.message + "</div></div></div>"
    // );

    // var user = sessionStorage.getItem("users");
    // console.log(user);
    // if (user != "undefined") {
    //   console.log(user);
    //   var storedArray = JSON.parse(sessionStorage.getItem("users")); //no brackets
    //   console.log(storedArray);
    //   var i;
    //   var usersArray = [];
    //   for (i = 0; i < storedArray.length; i++) {
    //     usersArray.push(storedArray[i]);
    //   }
    //   if (!storedArray.includes(data.username)) {
    //     console.log(data.username);
    //     usersArray.push(data.username);
    //     window.sessionStorage.setItem("users", JSON.stringify(usersArray));
    //     $("#all_users").append("<option>" + data.username + "</option>");
    //   }
    // } else {
    //   $("#all_users").append("<option>" + data.username + "</option>");
    //   window.sessionStorage.setItem("users", JSON.stringify([data.username]));
    // }
  });

  socket.on("change_username", (data) => {
    console.log(data);
    // feedback.html("");
    // message.val("");
    // $("all_users").append("<p class='usersall'>" + data.username + "</p>");
  });

  //Emit a username
  username.change(function () {
    socket.emit("change_username", {
      username: username.val(),
    });
    //
  });

  //Emit typing
  message.bind("keypress", () => {
    socket.emit("typing");
  });

  //Listen on typing
  socket.on("typing", (data) => {
    console.log("typeing");
    feedback.html(
      "<p><i>" + data.username + " is typing a message..." + "</i></p>"
    );
  });

  // var user = sessionStorage.getItem("users");
  // console.log(user);
  // if (user != "undefined") {
  //   console.log(user);
  //   var storedArray = JSON.parse(sessionStorage.getItem("users")); //no brackets
  //   var i;
  //   for (i = 0; i < storedArray.length; i++) {
  //     $("#all_users").append("<option>" + storedArray[i] + "</option>");
  //   }
  // }

  function myFunction() {
    var d = $("#all_users").val();
    alert(d);
    $("#username").val(d);
  }

  async function getMessage() {
    await $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/message/getall",
      // "data": data,
      success: function (res) {
        console.log("res////////////");
        console.log(res);
        res.forEach((element) => {
          // var type = typeof element.message;
          // type = type === 'object'
          // console.log(type)
          chatroom.append(
            "<div class='col-sm-12 message-main-sender'><div class='sender'> <div class='message-text'>" +
              element.user.name +
              ": " +
              element.message_text +
              "<button class='inreplay' onclick='replayMsg(" +
              element.id +
              ")'>...</button></div></div></div>"
          );
        });
      },
    });
  }
  getMessage();
  async function getAllUser() {
    await $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/user/getall",
      // "data": data,
      success: function (res) {
        console.log("res////////////");
        console.log(res);
        res.forEach((element) => {
          allusers.append("<p>" + element.name + "</p><hr>");
          username.append(
            "<option value='" +
              element.id +
              "-" +
              element.name +
              "'>" +
              element.name +
              "</option>"
          );
        });
      },
    });
  }
  getAllUser();

  function replayMsg() {
    alert("lll");
    $("#replay").val(true);
  }
  // $('#conversation').on('click', '.inreplay', function () {
  //   alert('replay')
  // });
});
