const User = require('../models/User');

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
    
};

module.exports.getUser = getUser;
module.exports.getAmount = getAmount;