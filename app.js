const config = require('dotenv')
const express = require('express')
const ConnectDB = require('./config/DB')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const { dateFormat, select } = require('./helpers/helpers')
const { ensureAuth } = require('./middleware/auth')
const app = express()

const { myGooglePassport } = require('./config/passport')
myGooglePassport(passport)
  // // get config settings
config.config({ path: './config/settings.env' })

// static path
app.use(express.static('public'))

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
app.use((req, res, next) => {
  res.locals.dateFormat = dateFormat,
    res.locals.select = select
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
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/stories', ensureAuth, storiesRoutes)


// Connect to Mongo
ConnectDB()

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})