//const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const signup = (req, res, next) => {
    // const { username, password } = req.body;
    // const user = new User({ username, password });
    // user.save()
    //     .then(() => res.json({ message: 'User created!' }))
    //     .catch(err => next(err));
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.json({
                "status": "error",
            });
        } else {
            const user = new User({
                username: req.body.username, 
                email: req.body.email, 
                password: hash
            });
            user.save()
            .then(result => {
                console.log(result);
                res.json({
                    "status": 'success',
                    "data": {
                        "username": result.username,
                        "password": result.password,
                    }
                });
            }).catch(err => {
                console.log(err);
                res.json({
                    "status": 'error'
                })
            });
        }
    })
    
};

const login = (req, res, next) => {
    
};

module.exports.signup = signup;
module.exports.login = login;