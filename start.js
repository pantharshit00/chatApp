const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config({ path: 'vars.env' });

mongoose.connect(process.env.DB_URI,{
    useMongoClient: true
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to Mongo !!!')
})

mongoose.connection.on('error',(err)=>{
    console.log('Mongo err => '+err)
})

// require Models here
require('./models/User');

const app = require('./app');
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log('App started on port '+PORT);
})