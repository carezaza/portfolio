const { VerifyToken } = require("../utiles/jwtToken");
const UserModel = require("../models/user");
const { configureStore } = require("@reduxjs/toolkit");
const { JWT_TOKEN_NAME } = process.env;

async function isAuthenticated(req, res, next) {
  const token = req.cookies[JWT_TOKEN_NAME];
  try {
    if (!token) throw new Error("Not authenticated.");

    const payload = VerifyToken(token);

    const existUser = await UserModel.findById(payload.id);

    if (!existUser) throw new Error("Not authenticated.");

    if (existUser.tokenVersion !== payload.tokenVersion) {
      throw new Error("Not authenticated.");
    }

    req.user = existUser;

    next();
  } catch (error) {
    console.error(error);
    res.clearCookie(JWT_TOKEN_NAME);
    return res.status(400).send({ error: error.message });
  }
}

module.exports = isAuthenticated;
