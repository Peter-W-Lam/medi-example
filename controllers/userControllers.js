const User = require('../models/User')

module.exports = {
    findAll: function(req, res) {
        User.find()
            .sort({name: -1})
            .then(users => res.json(users))
    }, 
    // These can all probably be consolidated
    findByUsername: function(req, res) {
        User.findOne({name: req.params.username})
            .then(user => res.json(user))
            .catch(err => res.status(404).json(err))
    },
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
    findByEmail: function(req, res) {
        User.findOne({email: req.params.email})
            .then(user => res.json(user))
            .catch(err => res.status(404).json(err))
    },
    
    // Not sure if if statement is still needed
    create: function (req, res) {
        User.findOne({email: req.body.email}, (err, duplicate) => {
            // if (duplicate) {
            //     res.status(400).json("Duplicate user already exists with email");
            //     return
            // } else {
                const newUser = new User(req.body);
                newUser.save()
                       .then((user => res.json(user)))
                       .catch(e => res.status(400).send(e))
            // }
            
        })
    },
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