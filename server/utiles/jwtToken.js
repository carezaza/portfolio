const { sign, verify } = require("jsonwebtoken");

function CreateToken(user) {
  return sign(
    { id: user.id, tokenVersion: user.tokenVersion },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: "3h" }
  );
}

function VerifyToken(token) {
  return verify(token, process.env.JWT_TOKEN_SECRET);
}

module.exports.CreateToken = CreateToken;
module.exports.VerifyToken = VerifyToken;
