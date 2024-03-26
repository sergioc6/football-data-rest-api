const express = require("express");
const router = express.Router();

const version1Routes = require("./v1/_v1.routes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.ejs", { title: "Football Data Rest API", api_docs: process.env.API_DOCS });
});

router.use(version1Routes);

module.exports = router;