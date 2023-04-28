require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectMongo = require("./connections");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");
const middleWares = require("./middlewares");

// express app
const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(middleWares.log);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("listning");
  }
});

connectMongo.connect();
