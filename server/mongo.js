require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const ConnectServer = async () => {
  // express app
  const app = express();

  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`connected to db & listning on port`, process.env.PORT);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = ConnectServer;
