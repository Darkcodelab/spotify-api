const router = require("express").Router();
const Axios = require("axios").default;
const ensureAuth = require("../config/ensureAuth");
const mongoose = require("mongoose");
const User = require("../models/User");
const getAccessToken = require("../config/accessTokenRefresh");

router.get("/", ensureAuth, async (req, res) => {
  let user = await User.findById(req.user);
  let accessToken = await getAccessToken(user.refreshToken);
  Axios({
    method: "GET",
    url: `https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
});

module.exports = router;
