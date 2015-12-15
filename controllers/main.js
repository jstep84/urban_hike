var db = require("../models");
var express = require("express");
var router = express.Router();

// GET homepage
router.get("/", function(req, res) {
	res.render("main/index");
});

// GET restricted page
router.get("/seekrit", function(req, res) {
	if (req.currentUser) {
		res.render("main/seekrit");
	} else {
		req.flash("danger", "ACCESS DENIED!");
		res.redirect("/");
	}
});

module.exports = router;