const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Story = require('../models/Story')
const Profile = require('../models/Profile')
const { validateRegisterForm } = require('../middleware/auth')
const bcrypt = require('bcryptjs')

router.get('/', async(req, res) => {

  if (!req.user) {
    res.render('home/login', { title: 'Login' });
  } else {
    try {

      const stories = await Story.find({ user: req.user._id })
        .populate('user')
      let profiles = await Profile.findOne({ userId: req.user._id })
      if (profiles == null) {
        profiles = new Profile()
      }
      res.render('home/dashboard.ejs', {
        user: req.user,
        stories: stories,
        title: 'Dashboard',
        profile: profiles

      })
    } catch (error) {
      console.log(error.message)
      res.render('error/500', { user: req.user, title: "500 error" })
    }
  }
})

router.get('/register', (req, res) => {
  res.render('home/register', { user: req.user, title: 'Register User' })
})

router.post('/register', validateRegisterForm, async(req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    let errors = []
    errors.push({ msg: "Email is already registered" })
    res.render('home/register', { title: "Register User", errors: errors, fields: req.body })
  } else {
    try {
      const newUser = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password
        })
        /// hash pawword
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(req.body.password, salt)
      newUser.password = hashPassword
      newUser.save();
      req.flash('success_msg', "Successfully registered!.. You may now login")
      res.redirect('/')
    } catch (error) {
      console.log(error.message)
      res.status(500).render('error/500', { title: "Error", error: error.message })
    }

  }

})

module.exports = router;