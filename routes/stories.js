const express = require('express')
const router = express.Router();
const Story = require('../models/Story')
const Comment = require('../models/Comment')
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

// @desc get all public stories of selected user
// GET /stories/user/:userId
router.get('/user/:userId', async(req, res) => {
  try {
    const stories = await Story.find({ user: req.params.userId, status: 'public' })
      .populate('user')

    res.render('stories/public', {
      caption: ` By ${stories[0].user.displayName}`,
      user: req.user,
      stories: stories,
      title: `Published Stories`
    });
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// @desc get all stories with status public
// GET /stories/public
router.get('/public', async(req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
    res.render('stories/public', {
      user: req.user,
      stories: stories,
      title: 'Published Stories',
      caption: ''
    });
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
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
    const comments = await Comment.find({ story: story._id })
      .populate('user').sort({ date: 'desc' });

    res.render('stories/story', {
      user: req.user,
      story: story,
      comments: comments,
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
    res.render('error/500', { user: req.user, title: '500 Error' })
  }
})
module.exports = router;