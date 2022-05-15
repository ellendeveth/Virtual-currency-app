const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getUser = (req, res, next) => {
    let firstname = req.body.firstname;
    User.find({ firstname }, (err, docs)=>{
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "user": docs,
                }
            })
        } else {
            res.json({
                "status": "error"
            })
        }
    })
};

const getAmount = (req, res, next) => {
    let token = req.headers.authorization;
    let decode = jwt.decode(token).userId;
    

    User.find({"_id":decode}, (err, doc) => {
        if(doc) {
            res.json({
                "userAmount": doc,
            });
        }
        else {
            res.json({
                "error": err
            });
        }
    });
};

module.exports.getUser = getUser;
module.exports.getAmount = getAmount;