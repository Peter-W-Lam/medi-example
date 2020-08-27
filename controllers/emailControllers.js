const User = require('../models/User')
const Token = require('../models/Token')
var crypto = require('crypto');
var nodemailer = require('nodemailer');

module.exports = {
    verifyHealthcareEmail: (req, res) => {
        const { healthcareEmail, userID}  = req.body
        if (!healthcareEmail) return res.status(400).send('Improper parameters');
        if (!userID) return res.status(400).send('Improper parameters');
        
        User.findById(userID, (err, user) => {
            if (err) res.status(500).send(err.message)
            if (!user) res.status(404).json({err: 'id-not-found', msg: 'No user with ID exists'})

            var token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')})
            const credentials = {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER, 
                    pass: process.env.MAIL_PASS  
                }
            }
            
            const transporter = nodemailer.createTransport(credentials)
            
            var mailOptions = { 
                from: process.env.MAIL_USER, 
                to: healthcareEmail, 
                subject: 'Medi: Account Verification Token', 
                text: 'Hello,\n\n' + 
                'Please verify your account by clicking the link: \nhttp:\/\/' + 
                req.headers.host + 
                '\/api\/email\/confirm\/' + token.token + '.\n' };
            
            token.save(e => {
                if (e) return res.status(500).send({ msg: e.message });
                transporter.sendMail(mailOptions, err => {
                    if (err) return res.status(500).send({ msg: err.message }); 
                    return res.status(200).send('A verification email has been sent to ' + healthcareEmail + '.');
                })
            })
        })
    }, 
    confirmEmail: (req, res) => {
        Token.findOne({token: req.params.token}, (err, token) => {
            if (err) return res.status(500).send(err.message)
            if (!token) return res.status(400).send('We were unable to find a valid token. Your token may have expired.')
        
            User.findOne({_id: token._userId}, (err, user) => {
                if (!user) return res.status(400).send('We were unable to find a user for this token.')
                if (user.isVerified) return res.status(400).send('This user has already been verified')

                user.isVerified = true;
                user.save(err => {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.status(200).send("The account has been verified. Please log in.");
                })
            })
        })
    },
    sendSupportEmail: (req, res) => {
        const {supportBody, userEmail} = req.body 
        const credentials = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS  
            }
        }
        
        const transporter = nodemailer.createTransport(credentials)

        var mailOptions = { 
            from: process.env.MAIL_USER, 
            to: process.env.MAIL_USER, 
            subject: `Support message from ${userEmail}`, 
            text: 'Hello,\n\n' + 
            `You have received a new message from ${userEmail}:\n\n` + 
            supportBody 
        };
        
        transporter.sendMail(mailOptions, err => {
            if (err) {
                console.log('Err:', err.message)
                return res.status(500).send({ msg: err.message })
            }; 
            return res.status(200).send('Your support message has been sent!');
        })
            
    }
}