const express = require("express");
const isAuthenticated = require("../middleWares/isAuth");
const UserModel = require("../models/user");
const PortModel = require("../models/ports");

const router = express.Router();

const { JWT_TOKEN_NAME } = process.env;

router.get("/currentUser", isAuthenticated, async (req, res) => {
  if (!req.user) return res.status(400).send("Not authenticated.");

  const port = await PortModel.findOne({ user: req.user.id });

  return res.json({ ...req.user._doc, handlePath: port.handlePath });
});

router.post("/logout", isAuthenticated, async (req, res) => {
  if (!req.user) return res.status(400).send("Not authenticated.");

  await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      $set: { tokenVersion: req.user.tokenVersion + 1 },
    },
    { new: true }
  );
  res.clearCookie(JWT_TOKEN_NAME);
  return res.send("Logout successfully.");
});

module.exports = router;
