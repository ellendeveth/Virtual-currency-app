const Transaction = require('../models/Transaction');

const add = (req, res, next) => {
    // make transaction possible
    const transaction = new Transaction({
        amount: req.body.amount,
        sender: req.body.sender,
        receiver: req.body.receiver
    });
    transaction.save();
    res.send('Transaction added');

}

const get = (req, res, next) => {
    // get all transactions
    Transaction.find({"sender": "Alejandro"}, (err, docs)=>{
        if(!err){
            res.json({
                "status": "success",
                "data": {
                    "transactions": docs,
                    
                }
            })
        }
    })

}

module.exports.add = add;
module.exports.get = get;