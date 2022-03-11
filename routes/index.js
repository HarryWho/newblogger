const express = require('express')
const router = express.Router()
const Story = require('../models/Story')

router.get('/', async(req, res) => {

  if (!req.user) {
    res.render('home/login', { title: 'Login' });
  } else {
    try {

      const stories = await Story.find({ user: req.user._id });
      res.render('home/dashboard.ejs', {
        user: req.user,
        stories: stories,
        title: 'Dashboard'

      })
    } catch (error) {
      console.log(error.message)
      req.exit(1)
    }
  }
})


module.exports = router;