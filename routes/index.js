const router = require("express").Router();
const path = require("path");

//route - '/'
//method - GET
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/index"));
});

module.exports = router;
