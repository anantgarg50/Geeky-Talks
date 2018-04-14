module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
  });

  app.post("/register", (req, res) => {
    res.send({ message: `${req.body.email} is registered!` });
    console.log(`${req.body.email} is registered!`);
  });
};
