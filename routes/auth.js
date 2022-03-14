const express = require('express')
const router = express.Router();
const lpassport = require('passport');
const gpassport = require('passport')
const { localPassport, myGooglePassport } = require('../config/passport')



myGooglePassport(gpassport)
localPassport(lpassport)

const { ensureGuest } = require('../middleware/auth');
// myLocalPassport(passport)
router.get('/google', ensureGuest,
  gpassport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', ensureGuest,
  gpassport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.flash('success_msg', `Welcome back ${req.user.firstName}`)
    res.redirect('/');
  });

router.post('/login', lpassport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}))


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router;