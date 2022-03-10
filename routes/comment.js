const express = require('express')
const router = express.Router();
const Comment = require('../models/Comment')
router.post('/', async(req, res) => {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      user: req.body.user,
      story: req.body.story
    })
    await comment.save()
    res.send(`/stories/show/${req.body.story}`)
  } catch (error) {
    console.log(error)
  }

})

module.exports = router;