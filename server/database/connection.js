const mongoose = require("mongoose");

const uri =
  "mongodb://mrityunjay:mrityunjay@cluster0-shard-00-00-enrzj.mongodb.net:27017," +
  "cluster0-shard-00-01-enrzj.mongodb.net:27017," +
  "cluster0-shard-00-02-enrzj.mongodb.net:27017" +
  "/test?ssl=true&replicaSet=cluster0-shard-0&authSource=admin";

mongoose.Promise = global.Promise;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.log("Connection Error: " + err);
  });

module.exports = mongoose.connection;
