const Transaction = require('../models/Transaction');
const jwt = require("jsonwebtoken");

const add = (req, res, next) => {
    let token = req.headers.authorization;
    let decode = jwt.decode(token).userId;
   
    // make transaction possible
    const transaction = new Transaction({
        amount: req.body.amount,
        sender: decode,
        receiver: req.body.receiver,
        reason: req.body.reason
    });
    transaction.save((err, result)=>{
        if (err) {
            res.json({
                "status": 'error',
                "message": 'Could not make the transaction'
            })
        } else {
            res.json({
                "status": 'success',
                "message": 'Transaction made',
                "data": {
                    "transaction": result,
                }
            })
        }
    });
    res.send('Transaction added');

}

const getAll = (req, res, next) => {
    // get all transactions
    Transaction.find((err, docs)=>{
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transactions": docs,
                    
                }
            })
        } else {
            res.json({
                "status": "error"
            })
        }
    })

}

const getById = (req, res, next) => {
    // get transaction by id
    Transaction.findById(req.params.id, (err, doc)=>{
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transaction": doc,
                }
            })
        } else {
            res.json({
                "status": "error"
            })
        }
    })
}

module.exports.add = add;
module.exports.getAll = getAll;
module.exports.getById = getById;