require("dotenv").config();
const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (err) {
          console.log("database error");
        } else {
          console.log("database Connected");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
