const User = require("../database/models/userModel");

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(
        user
      );
    } catch (err) {
      res.status(400).send({
        error: err
      });
      console.log(err);
    }
  }
};