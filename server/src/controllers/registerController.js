const User = require("../database/models/userModel");

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).send({ message: "Registration success!" });
    } catch (err) {
      if (err.code == 11000) {
        var field = err.message.split(".")[1];
        field = field.split(": ")[1];
        field = field.substring(0, field.lastIndexOf("_"));

        switch (field) {
          case "email":
            res.status(400).send({
              error: "E-mail is already Registered."
            });
            break;
          case "userId":
            res.status(400).send({
              error: "User ID is already Registered."
            });
            break;
        }
      }
      console.log(err);
    }
  }
};
