const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./config/db");

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded());

app.get("/users", (req, res) => {
  res.send("list of users:");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
