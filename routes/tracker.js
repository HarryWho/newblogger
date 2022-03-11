const express = require('express')
const router = express()
const Tracker = require('../models/Tracker')
  // @desc loads expenses from mongo and displays them top the screen
  // GET /tracker
router.get('/', async(req, res) => {
  try {
    const tracker = await Tracker.find().sort({ record: 'desc' })
    res.render('tracker/tracker', { title: 'Expence Tracker', tracker: tracker, user: req.user })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

// @desc Save Expense/Credit data
// POST /tracker
router.post('/', async(req, res) => {
  try {

    const credit = req.body.creddeb == 'credit' ? req.body.amount : 0
    const debit = req.body.creddeb == 'debit' ? req.body.amount : 0
    const balance = req.body.balance;
    const balanced = req.body.creddeb == 'credit' ?
      parseFloat(balance) + parseFloat(credit) : parseFloat(balance) - parseFloat(debit)
    const myTaracker = {
      balance: balanced,
      credit: credit,
      debit: debit,
      description: req.body.desc,
      date: req.body.date,
      record: req.body.record
    };
    const tracker = new Tracker(myTaracker)
    tracker.save()
    res.redirect('/tracker')

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

module.exports = router;