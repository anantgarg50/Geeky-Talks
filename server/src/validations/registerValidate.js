const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      privilege: Joi.string(),
      userId: Joi.string()
    };

    const { error, value } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case "name":
          res.status(400).send({
            error: "Name is required."
          });
          break;
        case "email":
          if (error.details[0].context.value == null) {
            res.status(400).send({ error: "E-mail is required." });
          } else {
            res.status(400).send({ error: "E-mail must be valid." });
          }
          break;
        case "password":
          if (error.details[0].context.value == null) {
            res.status(400).send({ error: "Password is required." });
          } else {
            res.status(400).send({
              error: "Password must be minimum of 8 characters."
            });
          }
          break;
        default:
          res.status(400).send({
            error: "Invalid registration information."
          });
      }
    } else {
      next();
    }
  }
};
