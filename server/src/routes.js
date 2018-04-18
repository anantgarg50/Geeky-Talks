const registerController = require("./controllers/registerController");
const registerValidate = require("./validations/registerValidate");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
  });

  app.post("/register", registerValidate.register, registerController.register);
};
