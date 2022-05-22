const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
let config = require('../config/config');

const signup = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        let email = req.body.email;
        if (user.length >= 1) {
            //er bestaat al een user met deze email
            return res.json({
                status: 'error',
                message: 'Deze gebruiker bestaat al. Log in met je account.'
            })
        }
        if (!email.includes("@student.thomasmore.be")) {
            return res.json({
                "status": 'error',
                "message": 'Gebruik een correct studenten email.'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        status: "error",
                        message: "Er ging iets mis, probeer opnieuw."
                    });
                } else {
                    const user = new User({
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                        balance: 100
                    });
                    user.save()
                        .then(result => {
                            console.log(result);
                            res.json({
                                "status": 'success',
                                "data": {
                                    "username": result.username,
                                    "firstname": result.firstname,
                                    "lastname": result.lastname,
                                    "password": result.password,
                                    "balance": result.balance,
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                            res.json({
                                "status": 'error',
                                "message": 'Er ging iets mis, probeer opnieuw.'
                            })
                        });
                }
            })

        }
    });

};

const login = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length < 1) {
            //user doesnt exist
            return res.json({
                status: 'error',
                message: "Deze gebruiker bestaat niet, registreer een account."
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.json({
                    status: 'error',
                    message: 'Wachtwoord is incorrect, probeer opnieuw.'
                })
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    username: user[0].username,
                }, config.passwordToken, {
                    expiresIn: "24h"
                });
                return res.json({
                    status: 'success',
                    message: 'Auth successful',
                    token: token,
                    username: user[0].username,
                })
            }
            res.json({
                status: 'error',
                message: 'Wachtwoord is incorrect, probeer opnieuw.'
            })
        })
    })
};

module.exports.signup = signup;
module.exports.login = login;