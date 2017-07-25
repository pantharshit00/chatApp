const promisify  = require('es6-promisify');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.validateRegister = async (req, res, next) => {
  req.sanitizeBody('name');
  req.sanitizeBody('username')
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('username', 'You must supply a username').notEmpty();
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.render('index', { title: 'Register', body: req.body});
    return; // stop the fn from running
  }
  next(); // there were no errors!
};


exports.register = async (req, res, next) => {
  const user = new User({ username: req.body.username, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); // pass to authController.login
};