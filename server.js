const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const checkJwt = require('./routes/verifyToken')
// const jwt = require('express-jwt')
// const jwks = require('jwks-rsa')
// const jwtAuthz = require('express-jwt-authz');


const app = express();

app.use(bodyParser.json());  
// app.use(jwtCheck)

const db = require('./config/keys').mongoURI

// Mongoose settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



// const checkScopes = jwtAuthz([ 'edit:coupons' ]);
// Test route for checking the scopes



// Deployment: serve static pages from react build 
app.use(express.static('client/build')); 

// Secure all routes to use Auth0 JWT tokens 
// app.use(checkJwt);

app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
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


