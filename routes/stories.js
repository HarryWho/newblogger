const express = require('express')
const router = express.Router();
const Story = require('../models/Story')
  // @desc get the add story form
  // GET /stories/add
router.get('/', (req, res) => {
  res.render('stories/addstory', {
    user: req.user,
    action: '/stories',
    story: new Story(),
    caption: 'Create',
    title: 'Create Story'
  });
})

// @desc get story data and send it to the edit form
// GET /stories/edit/:storyId
router.get('/edit/:storyId', async(req, res) => {
    try {
      const story = await Story.findById(req.params.storyId)
      res.render('stories/addstory', {
        user: req.user,
        story: story,
        action: `/stories/update/${story._id}?_method=PUT`,
        caption: 'Update',
        title: 'Edit Story'
      });
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  })
  // @desc get story data and render it on the screen
  // GET /stories/show/:storyId
router.get('/show/:storyId', async(req, res) => {
  try {
    const story = await Story.findById(req.params.storyId)
      .populate('user').lean();

    res.render('stories/story', {
      user: req.user,
      story: story,
      title: 'Story'
    });
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// @desc get story data and send it to the edit form
// PUT /stories/update/:storyId
router.put('/update/:storyId', async(req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.storyId, req.body)
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// @desc get story id and delete it
// DELETE /stories/delete/:storyId
router.delete('/delete/:storyId', async(req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.storyId)
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// @desc get the data from form and save it to mongo
// POST /stories/add
router.post('/', async(req, res) => {
  req.body.user = req.user;

  try {
    const story = await Story.create(req.body)

    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})
module.exports = router;