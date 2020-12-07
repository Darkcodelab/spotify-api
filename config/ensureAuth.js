let ensureAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // res.redirect("/");
    res.json({
      statusCode: 401,
      Message: "User is not Authenticated",
    });
  }
};

module.exports = ensureAuth;
