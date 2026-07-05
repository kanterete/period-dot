const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./config/db");

const app = express();

const port = process.env.PORT;

const roleRoutes = require("./routes/roleRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/roles", roleRoutes);
app.use("/symptoms", symptomRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
