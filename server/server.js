require("dotenv").config();
const express = require("express");
const connectMongo = require("./connections");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");
const middleWares = require("./middlewares");

// express app
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(middleWares.log);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("listning");
  }
});

connectMongo.connect();
