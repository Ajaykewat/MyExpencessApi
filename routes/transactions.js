// routes/transactions.js

const express = require('express');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const router = express.Router();

// Create a new transaction
router.post('/', async (req, res) => {
    try {
        const { userId, amount, details, paymentMode, paymentType } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transaction = new Transaction({
            user: userId,
            amount,
            details,
            paymentMode,
            paymentType
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('user');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('user');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a transaction by ID
router.put('/:id', async (req, res) => {
    try {
        const { userId, amount, details, paymentMode, paymentType } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            {
                user: userId,
                amount,
                details,
                paymentMode,
                paymentType
            },
            { new: true }
        );

        if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a transaction by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
