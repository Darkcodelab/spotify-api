const router = require("express").Router();
const Axios = require("axios").default;
const User = require("../models/User");
const getAccessToken = require("../config/accessTokenRefresh");
const ensureAuth = require("../config/ensureAuth");
const passport = require("passport");

router.get("/:id", ensureAuth, async (req, res) => {
  let user = await User.findById(req.user);
  let accessToken = await getAccessToken(user.refreshToken);
  Axios({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${req.params.id}/top-tracks?market=IN`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
});

module.exports = router;
