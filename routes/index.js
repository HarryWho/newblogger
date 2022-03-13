const express = require('express')
const router = express.Router()
const Story = require('../models/Story')
const Profile = require('../models/Profile')
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

router.post('/register', async(req, res) => {

})

module.exports = router;