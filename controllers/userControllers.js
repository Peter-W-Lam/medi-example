const User = require('../models/User')

module.exports = {
    findAll: function(req, res) {
        User.find()
            .sort({name: -1})
            .then(users => res.json(users))
    }, 
    findByUsername: function(req, res) {
        User.findOne({name: req.body.name})
            .then((user => res.json(user)))
            .catch(err => res.status(404).json(err))
    },
    findByID: function(req, res) {
        User.findById(req.params.id)
            .then((user) => res.json(user))
            .catch(err => res.status(404).json(err))
    },
    // Add check to make sure user without name doens't exist first
    create: function (req, res) {
        const duplicate = User.findOne({name: req.body.name})
        if (duplicate) {
            console.log("Duplicate user already exists")
            res.status(400).json("Duplicate user already exists")
            return
        }
        const newUser = new User({
            name: req.body.name
        });
 
        newUser.save()
               .then((user => res.json(user)))
    },
    update: function(req, res) {
		User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(user => {
                if (req.body.name) {
                    user.name = req.body.name
                }
                if (req.body.savedCoupons) {
                    user.savedCoupons = req.body.savedCoupons
                }
                res.json(user)
            })
			.catch(err => res.status(422).json(err));
    },
    delete: function(req, res) {
        User.findByIdAndRemove({_id: req.params.id})
            .then(user => res.json("Successful deletion"))
            .catch(err => res.status(404).json(err))
    }

}