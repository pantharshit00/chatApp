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
    acount:{
    type: Number,
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    }
});

User.pre('save',function(){
    this.acount = Math.floor(Math.random() * 10)
})

User.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', User);