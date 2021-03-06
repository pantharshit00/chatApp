// requires the model with Passport-Local Mongoose plugged in
const mongoose = require('mongoose');
const User = mongoose.model('User');

// use static authenticate method of model in LocalStrategy
module.exports = (passport) => {
    passport.use(User.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}