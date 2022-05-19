const Transaction = require('../models/Transaction');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const add = async (req, res, next) => {
    let token = req.headers.authorization;
    let decode = jwt.decode(token).userId;

    let amount = req.body.amount
    let receiver = req.body.receiver
    let reason = req.body.reason

    // make transaction possible
    const transaction = new Transaction({
        amount: amount,
        sender: decode,
        receiver: receiver ,
        reason: reason
    });
    
    User.findById(decode, (err, doc)=>{
        if(doc.balance < amount ){
            res.json({
                "status": "error",
                "message": "You don't have enough money"
            })
        } else {
            //update sender balance
            let newAmount = doc.balance - amount;
            User.findByIdAndUpdate(decode, {balance: newAmount}, (err, doc)=>{

                //find receiver
                User.find({"firstname":receiver}, (err, doc) =>{
                    let oldAmount = doc[0].balance;
                    let newAmountreceiver = oldAmount + parseInt(amount);

                    //update receiver balance
                    User.findByIdAndUpdate(doc[0]._id, {balance: newAmountreceiver}, (err, doc)=>{ 
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
                        })
                    })
                })         
            }) 
        }
    })
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