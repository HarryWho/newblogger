const express = require('express')
const router = express.Router();
const passport = require('passport');

const { ensureGuest, ensureAuth } = require('../middleware/auth');

router.get('/google', ensureGuest,
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', ensureGuest,
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router;