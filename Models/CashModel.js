const mongoose = require('mongoose');

const CashSchema = new mongoose.Schema({
  cash: {type : Number, required : true},
  created_at: {type : Date, required : true, default: Date.now},
  cashDate: {type : String, required : true},
});

const Cash = mongoose.model('Cash', CashSchema);
module.exports = Cash;
