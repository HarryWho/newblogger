const express = require('express')
const router = express.Router();
const Profile = require('../models/Profile');
router.post('/', async(req, res) => {
  const skills = req.body.skills.split(',')
  const qualifications = req.body.qualifications.split(',')
  const profileData = {
    userID: req.user._id,
    school: req.body.school,
    level: req.body.level,
    qualifications: { qaulification: qualifications },
    skills: { skill: skills },
    about: req.body.about
  }
  try {
    const savedProfile = new Profile(profileData)
    await savedProfile.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.render('error/500', { user: req.user })
  }

})



module.exports = router