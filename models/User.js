const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

const User = new Schema({
    'username': {
        type: String,
        unique: true,
        trim: true,
        required: 'Username cant be empty'
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    }
});

User.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', User);