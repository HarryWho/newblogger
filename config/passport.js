const GoogleStrategy = require('passport-google-oauth2').Strategy
const config = require('dotenv')
const mongoose = require('mongoose')
const User = require('../models/User')
  // const passport = require('passport')
config.config({ path: './config/settings.env' })

module.exports = {
  myGooglePassport: function(passport) {

    passport.use(new GoogleStrategy({
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
          image: profile.photos[0].value
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

    passport.serializeUser((user, done) => {
      done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
    })
  }
}