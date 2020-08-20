const User = require('../models/User')
const Token = require('../models/Token')
var crypto = require('crypto');
var nodemailer = require('nodemailer');


module.exports = {
    findAll: function(req, res) {
        User.find()
            .sort({name: -1})
            .then(users => res.json(users))
    }, 
    // These can all probably be consolidated
    // findByUsername: function(req, res) {
    //     User.findOne({name: req.params.username})
    //         .then(user => res.json(user))
    //         .catch(err => res.status(404).json(err))
    // },
    findByID: function(req, res) {
        User.findById(req.params.id)
            .then((user) => res.json(user))
            .catch(err => res.status(404).json(err))
    },
    findByAuthID: function(req, res) {
        User.findOne({authID: req.params.id})
            .then((user) => {
                if (!user) {
                    res.status(404).send('User could not be found')
                }
                res.status(200).json(user)
            }
                
            )
            .catch(err => res.status(404).json(err))
    },
    // No longer needed?
    // findByEmail: function(req, res) {
    //     User.findOne({email: req.params.email})
    //         .then(user => res.json(user))
    //         .catch(err => res.status(404).json(err))
    // },
    
    // Not sure if if statement is still needed
    create: function (req, res) {
        User.findOne({email: req.body.email}, (err, user) => {
            if (user) {
                return res.status(400).json({err: 'email-exists', msg: 'User with email already exists'})
            }

            const newUser = new User(req.body);
            newUser.save(e => {
                if (e) return res.status(500).send(e.message);
                res.status(200).json(newUser)
                // // Create token, save it to the DB, and send an email with a link to make the get request to verify
                // var token = new Token({_userId: newUser._id, token: crypto.randomBytes(16).toString('hex')})
                // token.save(e => {
                //     if (e) return res.status(500).send(e.message);
                    
                //     const credentials = {
                //         host: 'smtp.gmail.com',
                //         port: 465,
                //         secure: true,
                //         auth: {
                //           user: process.env.MAIL_USER, 
                //           pass: process.env.MAIL_PASS  
                //         }
                //     }

                //     const transporter = nodemailer.createTransport(credentials)
                //     var mailOptions = { 
                //         from: process.env.MAIL_USER, 
                //         to: newUser.email, 
                //         subject: 'Medi: Account Verification Token', 
                //         text: 'Hello,\n\n' + 
                //         'Please verify your account by clicking the link: \nhttp:\/\/' + 
                //         req.headers.host + 
                //         '\/confirmation\/' + token.token + '.\n' };
                    
                    
                //     transporter.sendMail(mailOptions, function (err) {
                //         if (err) { return res.status(500).send({ msg: err.message }); }
                //         res.status(200).send('A verification email has been sent to ' + newUser.email + '.');
                //     })
            
                
            
            
                // })
            })
        })
    },
    // Needs to be fixed
    update: function(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(user => {
                if (req.body.name && user.name !== req.body.name) {
                    user.name = req.body.name
                }
                if (req.body.savedCoupons && user.savedCoupons !== req.body.savedCoupons) {
                    user.savedCoupons = req.body.savedCoupons
                }
                res.json(user)
            })
			.catch(err => res.status(422).json(err));
    },
    addCoupon: function(req, res) {
        const { couponID } = req.body

        User.findOneAndUpdate({_id: req.params.id}, 
            {"$push": {"savedCoupons": couponID}},
            {"new": true},
            (err, managerparent) => {
                if (err) throw err;
                res.status(200).json(managerparent)
            })
    },
    removeCoupon: function(req, res) {
        const { couponID } = req.body

        User.findOneAndUpdate({_id: req.params.id}, 
            {"$pull": {"savedCoupons": couponID}},
            {"new": true},
            (err, managerparent) => {
                if (err) throw err;
                res.status(200).json(managerparent)
            })
    },

    delete: function(req, res) {
        User.findByIdAndRemove({_id: req.params.id})
            .then(user => res.json("Successful deletion"))
            .catch(err => res.status(404).json(err))
    }


}