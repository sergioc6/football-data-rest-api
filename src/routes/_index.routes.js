const express = require("express");
const router = express.Router();

const version1Routes = require("./v1/_v1.routes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Doctor Notes APP" });
});

router.use(version1Routes);

module.exports = router;