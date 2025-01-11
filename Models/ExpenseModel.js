const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  item: {type : String, required : true},
  total_price: {type : Number, required : true},
  expenseCategory: {type : String, required : true},
  created_at: {type : Date, required : true, default: Date.now},
  expenseDate: {type : String, required : true},
});

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
