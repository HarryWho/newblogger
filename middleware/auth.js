// const { ensureGuest } = require("../../blogger/middleware/auth")

const { response } = require("../routes/tracker")

module.exports = {
  ensureAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  ensureGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/')
    } else {
      return next()
    }
  },

  validateRegisterForm: function(req, res, next) {
    const { displayName, email, password, password2 } = req.body
    let errors = []
      // all fields required
    if (!displayName || !email || !password || !password2) {
      errors.push({ msg: "Please fill in all fields" })
    }
    // passwords match
    if (password != password2) {
      errors.push({ msg: 'Passwords don\'t match' })
    }
    // check valid email
    var mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!email.match(mailformat)) {
      errors.push({ msg: "This is not a valid email address" });
    }
    // check password length
    if (password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' })
    }
    if (errors.length > 0) {
      res.render('home/register', { title: "Register User", errors: errors, fields: req.body })
    } else {
      next()
    }

  }

}