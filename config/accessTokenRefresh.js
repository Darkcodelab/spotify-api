// const mongoose = require("mongoose");
// const User = require("../models/User");
const Axios = require("axios").default;
const qs = require("querystring");

module.exports = async function (refreshToken) {
  let formData = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  let accessToken = await Axios({
    method: "POST",
    url:
      "https://" +
      process.env.client_id +
      ":" +
      process.env.client_secret +
      "@accounts.spotify.com/api/token",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formData,
  })
    .then((result) => {
      return result.data["access_token"];
    })
    .catch((e) => console.log(e));
  return accessToken;
};

