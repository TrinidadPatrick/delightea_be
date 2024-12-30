const Expense = require('../Models/ExpenseModel');

module.exports.addExpense = async (req, res) => {
    const {item, total_price, expenseDate} = req.body;
    try {
        const response = await Expense.create({item, total_price, expenseDate});
        res.status(200).json({expense: response});
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

module.exports.getExpenses = async (req, res) => {4
    const dateString = req.query.date;

    try {
        const response = await Expense.find({expenseDate : dateString});
        return res.status(200).json({expenses: response})
    } catch (error) {
        return res.status(500).json({ message: 'Error getting expenses' });
    }
};

module.exports.deleteExpense = async (req, res) => {
    const {_id} = req.params;
    try {
        const response = await Expense.findOneAndDelete({_id : _id});
        res.status(200).json({expense: response});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
};

module.exports.updateExpense = async (req, res) => {
    const {_id, item, total_price} = req.body;
    try {
        const response = await Expense.findOneAndUpdate({_id : _id}, {item, total_price});
        res.status(200).json({expense: response});
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
};

module.exports.computeExpenses = async (req, res) => {
    const dateString = req.query.date;
    console.log(dateString)
    try {
        const response = await Expense.find({expenseDate : dateString});
        const totalExpenses = response.reduce((acc, item) => acc + item.total_price, 0);
        return res.status(200).json({totalExpenses: totalExpenses})
    } catch (error) {
        return res.status(500).json({ message: 'Error getting expenses' });
    }
};