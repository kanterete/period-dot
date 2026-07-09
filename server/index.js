const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const db = require("./config/db");

const app = express();

const port = process.env.PORT;

const roleRoutes = require("./routes/roleRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const cycleRoutes = require("./routes/cycleRoutes");

app.use(express.json());
app.use(cookieParser());
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

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/symptoms", symptomRoutes);

app.use("/auth", authRoutes);
app.use("/admin/users/", adminRoutes);
app.use("/cycles", cycleRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
