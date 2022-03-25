import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./router/user.js";
import voteRouter from "./router/vote.js";

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
  res.status(500).send("server error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
