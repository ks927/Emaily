const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// turn mongoose user instance into an id
passport.serializeUser((user, done) => {
  // user.id identifies user for follow up requests
  // user.id is mongoose's user id, not the google profile id
  done(null, user.id);
});

// turn id into a mongoose user instance
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    });
});

// new instance of passport strategy
// console.developers.google.com
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, 
  async (accessToken, refreshToken, profile, done) => {
    // query db for that googleId
    const existingUser = await User.findOne({ googleId: profile.id})
      if(existingUser) {
        // we already have a record with the given id
        return done(null, existingUser);
      }
      // we don't have a user with given id, make a new record
      // save that googleId to the db
      // new model instance
      const user = await new User({ googleId: profile.id }).save();
        done(null, user);
  }));