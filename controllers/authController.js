const passport = require('passport');
const { promisify } = require('util');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});
