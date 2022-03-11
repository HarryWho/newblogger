const config = require('dotenv')
const express = require('express')
const path = require('path')
const partials = require('express-partials')
const ConnectDB = require('./config/DB')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const { ensureAuth, ensureGuest } = require('./middleware/auth')
const app = express()

const { myGooglePassport } = require('./config/passport')
myGooglePassport(passport)
  // // get config settings
config.config({ path: './config/settings.env' })


// static path
app.use(express.static(path.join(__dirname, '/public')))

// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
  // ejs setup

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set("layout extractStyles", true)
app.set('layout extractScripts', true)
app.use(expressLayouts)

//Express session
app.use(session({
  secret: 'keyboard cat',
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: true

}))


// helper function
app.use(flash())
const { dateFormat, select, stripTags, truncate, addButton } = require('./helpers/helpers')
app.use((req, res, next) => {
  res.locals.dateFormat = dateFormat,
    res.locals.select = select,
    res.locals.stripTags = stripTags,
    res.locals.truncate = truncate,
    res.locals.addButton = addButton
  res.locals.error_msg = req.flash('error')
  res.locals.success_msg = req.flash('success')
  next()
})

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))

//Routes
const homeRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const storiesRoutes = require('./routes/stories')
const commentRoutes = require('./routes/comment')
const trackRoutes = require('./routes/tracker')
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/stories', ensureAuth, storiesRoutes)
app.use('/comment', ensureAuth, commentRoutes)
app.use('/tracker', ensureAuth, trackRoutes)


// Connect to Mongo
ConnectDB()

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})