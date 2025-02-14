// models/transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    paymentMode: {
        type: String,
        enum: ['Cash', 'Card', 'Online', 'Other'],
        required: true,
    },
    paymentType: {
        type: String,
        enum: ['Credit', 'Debit', 'Transfer', 'Other'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
