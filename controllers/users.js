//const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const signup = (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            //er bestaat al een user met deze email
            return res.json({
                status: 'error',
                message: 'User already exists'
            })
        } else {
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
            
        }
    }); 
   
};

const login = (req, res, next) => {
    
};

module.exports.signup = signup;
module.exports.login = login;