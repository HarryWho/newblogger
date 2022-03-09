const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log("Here i am")
  if (!req.user) {
    res.render('home/login');
  } else {
    res.render('home/dashboard', { user: req.user })
  }
})


module.exports = router;