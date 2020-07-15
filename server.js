const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express();



app.use(bodyParser.json());

const db = require('./config/keys').mongoURI

mongoose.connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(express.static('client/build'));

app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))


