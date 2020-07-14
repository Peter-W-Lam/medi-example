const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI

mongoose.connect(db)
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Server started on port ${port}`))


