const express = require("express");
const passport = require("passport");
const { CreateToken } = require("../utiles/jwtToken");
const UserModel = require("../models/user");
const PortModel = require("../models/ports");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    const { id, emails } = req.profile;

    const existUser = await UserModel.findOne({ providerId: id });

    if (existUser) {
      res.cookie(process.env.JWT_TOKEN_NAME, CreateToken(existUser));
      return res.redirect("/");
    }

    const newUser = await UserModel.create({
      email: emails[0].value,
      providerId: id,
    });

    await PortModel.create({
      user: newUser,
      handlePath: id,
    });

    await res.cookie(process.env.JWT_TOKEN_NAME, CreateToken(newUser));
    return res.redirect("/");
  }
);

module.exports = router;
