api_validations = module.exports = {
  checkUserBody(body) {
    console.log(body);
    return new Promise(function (resolve, reject) {
      if (!body) {
        reject({
          error: {
            message: "Missing parameter user in body request",
            code: 400,
            title: "Bad Request",
          },
        });
      } else if (!body.user) {
        reject({
          error: {
            message: "Cannot set empty user",
            code: 400,
            title: "Bad Request",
          },
        });
      } else if (!body.message_text) {
        reject({
          error: {
            message: "Cannot set empty message text",
            code: 400,
            title: "Bad Request",
          },
        });
      } else {
        resolve();
      }
    });
  },
  checkMessageBody(body) {
    console.log(body);
    return new Promise(function (resolve, reject) {
      if (!body) {
        reject({
          error: {
            message: "Missing parameter user in body request",
            code: 400,
            title: "Bad Request",
          },
        });
      } else if (!body.name) {
        reject({
          error: {
            message: "Cannot set empty name",
            code: 400,
            title: "Bad Request",
          },
        });
      } else if (!body.email) {
        reject({
          error: {
            message: "Cannot set empty email",
            code: 400,
            title: "Bad Request",
          },
        });
      } else {
        resolve();
      }
    });
  },
};