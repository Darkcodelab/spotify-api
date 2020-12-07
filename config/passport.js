const mongoose = require("mongoose");
const User = require("../models/User");
const SpotifyStrategy = require("passport-spotify").Strategy;
const PORT = process.env.PORT;

module.exports = function (passport) {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.client_id,
        clientSecret: process.env.client_secret,
        callbackURL: "http://localhost:" + PORT + "/auth/spotify/callback",
      },
      async function (accessToken, refreshToken, expires_in, profile, done) {
        const newUser = {
          refreshToken,
          displayName: profile.displayName,
          id: profile.id,
        };
        try {
          let user = await User.findOne({ spotifyID: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ id }, (err, user) => done(err, user));
  });
};
