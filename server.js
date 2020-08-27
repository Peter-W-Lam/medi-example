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


// Log both each request and response that the server gets and sends
const getLoggerForStatusCode = (statusCode) => {
    if (statusCode >= 500) {
        return console.error.bind(console)
    }
    if (statusCode >= 400) {
        return console.warn.bind(console)
    }

    return console.log.bind(console)
}

const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`)
       
    const cleanup = () => {
        res.removeListener('finish', logFn)
        res.removeListener('close', abortFn)
        res.removeListener('error', errorFn)
    }

    const logFn = () => {
        cleanup()
        const logger = getLoggerForStatusCode(res.statusCode)
        logger(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    }

    const abortFn = () => {
        cleanup()
        console.warn('Request aborted by the client')
    }

    const errorFn = err => {
        cleanup()
        console.error(`Request pipeline error: ${err}`)
    }

    res.on('finish', logFn) // successful pipeline (regardless of its response)
    res.on('close', abortFn) // aborted pipeline
    res.on('error', errorFn) // pipeline internal error
    next()
}

app.use(logRequestStart)


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


