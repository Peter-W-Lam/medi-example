const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const nodemon = require('nodemon');
const routes = require('./routes')




const app = express();



app.use(bodyParser.json());  

const db = require('./config/keys').mongoURI

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(express.static('client/build')); 

app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
process.on('SIGUSR2', () => { console.log("Nodemon is quitting!"); process.exit(); });

process.on('SIGTERM', () => {
    console.log('SIGTERM');
    process.exit()
  });
process.on('exit', () => {
    console.log('exit');
    process.exit(0);
});


