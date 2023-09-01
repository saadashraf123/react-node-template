require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./src/routes/user");
const authRouter = require("./src/routes/auth");
const getUserFromToken = require("./src/middleware/get-user-from-token");
var app = express();
app.use(cors());

var port = process.env.PORT || 3000;

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("*", getUserFromToken);

app.get("/", (req, res) => {
  return res.status(200).send("Express Server Running");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => console.log("Express App is running on port 3000"));
