const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./router/user");
const voteRouter = require("./router/vote");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/user", userRouter);
app.use("/vote", voteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("server error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
