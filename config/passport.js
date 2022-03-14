const GoogleStrategy = require('passport-google-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const config = require('dotenv')
const mongoose = require('mongoose')
const User = require('../models/User')


config.config({ path: './config/settings.env' })

module.exports = {
  myGooglePassport: function(gpassport) {
    console.log("google")
    gpassport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'

      },
      async(accessToken, refreshToken, profile, done) => {

        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.email
        }
        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(`Am i here?.. ${err}`)
        }
      }));

    gpassport.serializeUser((user, done) => {
      done(null, user.id)
    })

    gpassport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
    })

  },
  localPassport: function(lpassport) {

    lpassport.use(
      new LocalStrategy({ usernameField: 'email' },
        async(email, password, done) => {
          console.log(email)
          try {
            const user = await User.findOne({ email: email })
            console.log(user)
            if (user && bcrypt.compare(password, user.password)) {
              done(null, user);
            } else {
              console.log('lpassport')
              done(null, false);
            }
          } catch (error) {
            console.log(error)
            done(error)
          }
        }));

    lpassport.serializeUser((user, done) => {
      done(null, user.id)
    })

    lpassport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
    })
  }

}