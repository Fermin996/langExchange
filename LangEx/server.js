const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI

//connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
.then(()=> console.log('MongoDb Connected'))
.catch(err => console.log(err))

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

app.get('/', (req,res) => {
  res.send('hello')
});


// Use routes 
app.use('/api/users', users);
app.use('/api/profile', profile);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
console.log(port)
app.listen(port,() => console.log(`Server running on port ${port}`));