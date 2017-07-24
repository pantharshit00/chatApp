const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

const User = new Schema({});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);