const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    amount: Number,
    sender: Schema.Types.ObjectId,
    receiver: String,
    reason: String,
}, { timestamps: {} });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;