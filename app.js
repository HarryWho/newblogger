const config = require('dotenv')
const express = require('express')
const ConnectDB = require('./config/DB')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const expressLayouts = require('express-ejs-layouts')
const app = express()

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
app.use(expressLayouts)

//Express session
app.use(session({
  secret: 'keyboard cat',
  //   store: MongoStore.create({
  //     mongoUrl: process.env.MONGO_URI,
  //     mongooseConnection: mongoose.connection
  //   }),
  resave: false,
  saveUninitialized: true
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
const homeRoutes = require('./routes/index')
app.get('/', homeRoutes)

// Connect to Mongo
ConnectDB()

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})