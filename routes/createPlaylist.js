const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const ensureAuth = require("../config/ensureAuth");
const getAccessToken = require("../config/accessTokenRefresh");
const Axios = require("axios").default;

router.get("/", ensureAuth, async (req, res) => {
  let user = await User.findById(req.user);
  let accessToken = await getAccessToken(user.refreshToken);
  let playlistName = req.query.playlist_name;
  let playlistDescription = req.query.playlist_description;
  let public = req.query.public;
  Axios({
    method: "POST",
    url: `https://api.spotify.com/v1/users/${user.id}/playlists`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: {
      name: playlistName || "New Playlist",
      description: playlistDescription || "New playlist description",
      public: public.toLowerCase() == "true" ? true : false,
    },
  })
    .then((r) => res.json({ message: "PlayList Created" }))
    .catch((e) => res.json({ message: e }));
});

module.exports = router;
