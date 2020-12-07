const router = require("express").Router();
const passport = require("passport");

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["playlist-modify-public", "playlist-modify-private"],
  }),
  (req, res) => {}
);
router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/success");
  }
);

module.exports = router;
