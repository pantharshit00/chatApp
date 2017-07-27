const passport = require('passport');
const { promisify } = require('util');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.login = passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: 'Invalid Credentials',
  successRedirect: '/chat',
  successFlash: 'You are now logged in!'
});


exports.isLoggedIn = (req,res,next) =>{
  if(req.isAuthenticated())
    next()
  else{
    req.flash('error','You are required to login in order to see that')
    res.redirect('/');
  }
}

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/');
};
