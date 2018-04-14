const registerController = require("./controllers/registerController");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
  });

  app.post("/register", registerController.register);
};
