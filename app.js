const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const promisify = require('es6-promisify')
const path = require('path');
const passport = require('passport');
const routes = require('./routes/index');
const validator = require('express-validator');
const { notFound, flashValidationErrors, productionErrors} = require('./config/errors');


require('./sockets/socket')(io);
require('./config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET,
  key:process.env.KEY,
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 2592000000
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV == "production"){
  app.use(morgan('combined'))
}

let avatars = [
    "https://semantic-ui.com/images/avatar/small/matt.jpg",
    "https://semantic-ui.com/images/avatar/small/elliot.jpg",
    "https://semantic-ui.com/images/avatar/small/jenny.jpg",
    "https://semantic-ui.com/images/avatar/small/joe.jpg",
    "https://semantic-ui.com/images/avatar2/small/elyse.png",
    "https://semantic-ui.com/images/avatar2/small/matthew.png",
    "https://semantic-ui.com/images/avatar2/small/kristy.png",
    "https://semantic-ui.com/images/avatar2/small/eve.png",
    "https://semantic-ui.com/images/avatar/small/helen.jpg",
    "https://semantic-ui.com/images/avatar/small/justen.jpg"
]

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.a = avatars
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login);
  next();
});


app.use(validator());

app.use('/', routes);

app.use(notFound);

app.use(flashValidationErrors);

app.use(productionErrors);

module.exports = server;