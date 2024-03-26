const express = require("express");
const router = express.Router();

//const authRoutes = require("./auth.routes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Doctor Notes APP" });
});

//router.use(authRoutes);


module.exports = router;