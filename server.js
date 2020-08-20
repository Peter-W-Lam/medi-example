const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const checkJwt = require('./routes/verifyToken')
require('dotenv').config();

const app = express();
const db = require('./config/keys').mongoURI
app.use(bodyParser.json()); 


// Mongoose settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



// Deployment: serve static pages from react build 
app.use(express.static('client/build')); 

app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))


// Nodemon debugging code: 
// process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
// process.on('SIGUSR2', () => { console.log("Nodemon is quitting!"); process.exit(); });

// process.on('SIGTERM', () => {
//     console.log('SIGTERM');
//     process.exit()
//   });
// process.on('exit', () => {
//     console.log('exit');
//     process.exit(0);
// });


