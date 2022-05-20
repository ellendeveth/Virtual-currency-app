const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
let config = require('../config/config');

const signup = (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        let email = req.body.email;
        if (user.length >= 1) {
            //er bestaat al een user met deze email
            return res.json({
                status: 'error',
                message: 'User already exists'
            })
        } 
        if(!email.includes("@student.thomasmore.be")){
            return res.json({
                "status": 'error',
                "message": 'Please use a valid student email'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        status: "error",
                    });
                } else {
                    const user = new User({
                        firstname: req.body.firstname, 
                        lastname: req.body.lastname,
                        email: req.body.email, 
                        password: hash,
                        balance: 10
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.json({
                            "status": 'success',
                            "data": {
                                "firstname": result.firstname,
                                "lastname": result.lastname,
                                "password": result.password,
                                "balance": result.balance,
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
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length < 1) {
            //user doesnt exist
            return res.json({
                status: 'error',
                message: "Authorization failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.json({
                    status: 'error',
                    message: 'Authorization failed'
                })
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    firstname: user[0].firstname,
                }, config.passwordToken, {
                    expiresIn: "1h"
                });
                return res.json({
                    status: 'success',
                    message: 'Auth successful',
                    token: token,
                    firstname: user[0].firstname,
                })
            }
            res.json({
                status: 'error',
                message: 'Auth failed'
            })
        })
    })
};

module.exports.signup = signup;
module.exports.login = login;