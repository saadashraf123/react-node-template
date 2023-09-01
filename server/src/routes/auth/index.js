const express = require("express");
const connection = require("../../database/index");
const { userLogin, getUser } = require("../../database/authQueries");
const { generateToken } = require("../../utills/jwt");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { sql, params } = userLogin({ email, password });

  connection.query(sql, params, (error, results) => {
    if (error) {
      return res.status(401).json({ message: "Couldn't sign in", error });
    }
    const user = results[0];
    if (!user) {
      return res.status(401).json({
        error: "Couldn't sign in",
        message: "Incorrect set of credentials",
      });
    }
    const token = generateToken({ email: user?.email });
    return res.status(201).json({ user, token });
  });
});

router.get("/me", (req, res) => {
  const { user } = req;
  const email = user?.email;
  if (user) {
    const { sql, params } = getUser({ email });
    connection.query(sql, params, (error, results) => {
      const user = results[0];
      if (error) {
        connection.query("ROLLBACK");
        return res.status(400).json({ message: "User Not Found", error });
      } else {
        console.log(user);
        return res.status(200).json({ user });
      }
    });
  } else {
    res.status(401).json({ message: "Out of session" });
  }
});

module.exports = router;
