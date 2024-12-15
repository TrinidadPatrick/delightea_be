const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: {type : String, required : true},
  items : {type : Array, required : true},
  total_price : {type : Number, required : true},
  change_price : {type : Number, required : true},
  customer_name : {type : String},
  created_at: {type : Date, default: Date.now},
  status: {type : String, default: 'active'},
});
const orders = mongoose.model('Orders', OrderSchema);
module.exports = orders;
