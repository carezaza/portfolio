const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = () =>
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      function (req, _accessToken, _refreshToken, profile, cb) {
        try {
          if (profile) {
            req.profile = profile;
            cb(undefined, profile);
          }
        } catch (error) {
          cb(error);
        }
      }
    )
  );
