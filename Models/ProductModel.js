const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: {type : String, required : true},
  product_price: {type : Number},
  image: {type : String, required : true},
  variants: [{variant_name: {type : String, required : true}, variant_price: {type : Number, required : true}, _id : false}],
  addons: [{type : mongoose.Schema.Types.ObjectId, required : true, ref: 'Addons'}],
  category_id: {type : mongoose.Schema.Types.ObjectId, required : true, ref: 'Categories'},
  created_at: {type : Date, default: Date.now},
  status: {type : String, default: 'active'},
});
const products = mongoose.model('Products', ProductSchema);
module.exports = products;
