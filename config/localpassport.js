const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const User = require('../models/User')
const { compareSync } = require('bcryptjs')




passport.use(new LocalStrategy({ usernameField: 'email' },
  function(email, password, done) {
    console.log(email)
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: "Email is not registered" });
      }
      if (!compareSync(password, user.password)) {
        return done(null, false, { message: "password incorrect" });
      }
      console.log(user)
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
})