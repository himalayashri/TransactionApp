const mongoose = require('mongoose');

const {Schema} = mongoose;

const TransactionSchema = new Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;