const express = require("express");
const connection = require("../../database/index");
const { createUser } = require("../../database/userQueries");
const { generateToken } = require("../../utills/jwt");

const router = express.Router();

router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  const { sql, params } = createUser({
    username,
    email,
    password,
  });

  connection.query(sql, params, (error, results) => {
    if (error) {
      connection.query("ROLLBACK");
      return res.status(400).json({ message: "Couldn't create User", error });
    }

    const user = results;
    const token = generateToken({ user: user });
    return res
      .status(200)
      .json({ user, token, message: "User Created Successfully" });
  });
});

module.exports = router;
