// config/passport.config.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const userService = require("../services/user.service");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await userService.findUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.findUserById(id);
  done(null, user);
});

module.exports = passport;
