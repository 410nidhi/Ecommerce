const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://newUser:newUser%4000@ecommerce.jwsqkr6.mongodb.net/Ecommerce?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log("Connected Database!");
    });
};

module.exports = connectDatabase;
