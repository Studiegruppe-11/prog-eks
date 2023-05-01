// routes/auth.routes.js

const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/signin", (req, res) => {
  // Render login form
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // Render dashboard
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
