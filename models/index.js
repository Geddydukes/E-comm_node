const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/e-commerce";

const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  User: require("./user"),
  Product: require("./product"),
  Review: require("./review"),
};
